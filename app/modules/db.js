import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@8.0.0/+esm'

const db = await openDB('db', 1, {
  upgrade (db, oldVersion, newVersion) {
    db.createObjectStore('mintee')
    console.debug(`Database version is upgraded from ${oldVersion} to ${newVersion}`)
  }
})
console.debug('Database is opened')

export async function load () {
  return await db.get('mintee', 'state')
}

export async function save (state) {
  await db.put('mintee', state, 'state')
}
