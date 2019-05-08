const BASE_API_RUL = 'https://application-generator-api.herokuapp.com';

export async function fetchFaculties() {
  return fetch(`${BASE_API_RUL}/syllabus/faculties`);
}

export async function fetchYears() {
  return fetch(`${BASE_API_RUL}/syllabus/years`);
}

export async function fetchTypes() {
  return fetch(`${BASE_API_RUL}/syllabus/types`);
}

export async function fetchCycles() {
  return fetch(`${BASE_API_RUL}/syllabus/levels`);
}

export async function fetchFields(faculty, year, type, level) {
  return fetch(`${BASE_API_RUL}/syllabus/fields?faculty=${faculty}&year=${year}&type=${type}&level=${level}`);
}

export async function fetchModules(faculty, year, type, level, field) {
  return fetch(`${BASE_API_RUL}/syllabus/modules?faculty=${faculty}&year=${year}&type=${type}&level=${level}&field=${field}`);
}

export async function fetchModule(faculty, year, type, level, field, mod) {
  return fetch(`${BASE_API_RUL}/syllabus/modules/${mod}?faculty=${faculty}&year=${year}&type=${type}&level=${level}&field=${field}`);
}

export async function fetchDean(faculty) {
  return fetch(`${BASE_API_RUL}/syllabus/deans?faculty=${faculty}`);
}
