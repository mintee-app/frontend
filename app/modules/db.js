import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@8.0.0/+esm'

const db = await openDB('db', 1, {
  upgrade (db, oldVersion, newVersion) {
    db.createObjectStore('mintee')
    console.debug(`Database version is upgraded from ${oldVersion} to ${newVersion}`)
  }
})
console.debug('Database is opened')

export async function getState () {
  const state = await db.get('mintee', 'state')
  console.debug('Got state from the database')
  return state
}

export async function setState (state) {
  await db.put('mintee', state, 'state')
  console.debug('Saved state to the database')
}
