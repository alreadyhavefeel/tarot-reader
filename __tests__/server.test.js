/**
 * @jest-environment node
 */

import request from 'supertest';
import { createApp } from '../server/database.js';

function makeDb(queryImpl) {
  return { query: jest.fn(queryImpl) };
}

describe('GET /api/cards', () => {
  it('returns all cards from the database', async () => {
    const rows = [
      { card_id: 1, name: 'The Fool' },
      { card_id: 2, name: 'The Magician' },
    ];
    const db = makeDb(() => Promise.resolve({ rows }));
    const app = createApp(db);

    const res = await request(app).get('/api/cards');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(rows);
    expect(db.query).toHaveBeenCalledWith('SELECT * FROM Cards');
  });

  it('returns an empty array when the table is empty', async () => {
    const db = makeDb(() => Promise.resolve({ rows: [] }));
    const res = await request(createApp(db)).get('/api/cards');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('returns 500 when the database query rejects', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const db = makeDb(() => Promise.reject(new Error('connection lost')));

    const res = await request(createApp(db)).get('/api/cards');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to fetch cards' });
    errSpy.mockRestore();
  });
});

describe('GET /api/cards/:id', () => {
  it('returns the matching card row', async () => {
    const row = { card_id: 7, name: 'The Chariot', name_th: 'ราชรถ' };
    const db = makeDb(() => Promise.resolve({ rows: [row] }));

    const res = await request(createApp(db)).get('/api/cards/7');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(row);
    expect(db.query).toHaveBeenCalledWith(
      'SELECT * FROM Cards WHERE card_id = $1',
      [7]
    );
  });

  it('coerces the id param to an integer before querying', async () => {
    const db = makeDb(() => Promise.resolve({ rows: [{ card_id: 3 }] }));
    await request(createApp(db)).get('/api/cards/3');

    const [, params] = db.query.mock.calls[0];
    expect(params).toEqual([3]);
    expect(typeof params[0]).toBe('number');
  });

  it('returns 404 when no card matches', async () => {
    const db = makeDb(() => Promise.resolve({ rows: [] }));

    const res = await request(createApp(db)).get('/api/cards/999');

    expect(res.status).toBe(404);
    expect(res.text).toBe('Card not found');
  });

  it.each([
    ['abc', 'non-numeric'],
    ['1.5', 'decimal'],
    ['0', 'zero'],
    ['-3', 'negative'],
    ['1e3', 'scientific notation'],
    ['1; DROP TABLE Cards;--', 'sql injection'],
  ])('rejects invalid id %p (%s) with 400 and never queries the db', async (id) => {
    const db = { query: jest.fn() };

    const res = await request(createApp(db)).get(
      `/api/cards/${encodeURIComponent(id)}`
    );

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid card id' });
    expect(db.query).not.toHaveBeenCalled();
  });

  it('returns 500 when the database query rejects', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const db = makeDb(() => Promise.reject(new Error('boom')));

    const res = await request(createApp(db)).get('/api/cards/1');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to fetch card' });
    errSpy.mockRestore();
  });
});
