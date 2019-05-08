import MutationTypes from '../../constants/MutationTypes';
import * as syllabus from '../../api/syllabus';
// import generatePdfApplication from '../../helpers/applicationFormHelper';

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export default {
  async submit() {
    if (this.$refs.form.validate()) {
      this.$router.push('pdf');
    }
    return null;
  },

  reset() {
    this.$refs.form.reset();
  },

  async fetchSyllabus(func, ...args) {
    try {
      this.$store.commit(MutationTypes.UPDATE_REQUEST_STATUS);
      const res = await syllabus[func](...args);
      const value = await res.json();
      this.$store.commit(MutationTypes.UPDATE_REQUEST_STATUS_SUCCESS);
      return value;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      this.$store.commit(MutationTypes.UPDATE_REQUEST_STATUS_FAILURE);
    }
    return null;
  },

  async updateDean() {
    const deanRes = await syllabus.fetchDean(this.$store.state.faculty);
    const dean = await deanRes.json();
    this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'dean', value: dean });
  },

  async updateSyllabus(key, value) {
    this.$store.commit(MutationTypes.UPDATE_SYLLABUS_PROPERTY, { key, value });
  },

  async setAvailableFaculties() {
    const value = await this.fetchSyllabus('fetchFaculties');
    const faculties = value.map(v => v.toUpperCase());
    this.updateSyllabus('faculties', faculties.sort());
  },

  async setAvailableYears() {
    const value = await this.fetchSyllabus('fetchYears');
    this.updateSyllabus('years', value);
  },

  async setAvailableTypes() {
    const value = await this.fetchSyllabus('fetchTypes');
    const types = value.map(v => capitalizeFirstLetter(v));
    this.updateSyllabus('types', types);
  },

  async setAvailableCycles() {
    const value = await this.fetchSyllabus('fetchCycles');
    this.updateSyllabus('cycles', value);
  },

  async setAvailableFields() {
    const {
      faculty,
      year,
      type,
      cycle,
    } = this.$store.state;
    if (faculty && year && type && cycle) {
      const value = await this.fetchSyllabus('fetchFields', faculty, year, type, cycle);
      this.updateSyllabus('fields', value.sort());
    }
  },

  async setAvailableSubjects() {
    const {
      faculty,
      year,
      type,
      cycle,
      field,
    } = this.$store.state;
    if (faculty && year && type && cycle && field) {
      const value = await this.fetchSyllabus('fetchModules', faculty, year, type, cycle, field);
      this.updateSyllabus('subjects', value.sort());
    }
  },

  async setSelectedSubject(mod, val = {}) {
    const subject = val;
    this.$store.commit(MutationTypes.UPDATE_PROPERTY, {
      key: 'selectedSubjects',
      value: {
        ...this.$store.state.selectedSubjects,
        [mod]: {
          ...subject,
          name: mod,
          selectedActivities: [],
        },
      },
    });
  },

  async fetchSubjectDetails(mod) {
    const {
      faculty,
      year,
      type,
      cycle,
      field,
    } = this.$store.state;
    const value = await this.fetchSyllabus('fetchModule', faculty, year, type, cycle, field, mod);
    this.$store.state.syllabus.selectedSubjects[mod] = value;
    this.setSelectedSubject(mod, value);
  },

  async addSubject(mods) {
    const subs = this.$store.state.subjects;
    const toDelete = subs.filter(x => !mods.includes(x));
    const newSelectedSubjects = this.$store.state.selectedSubjects;
    toDelete.forEach((toDel) => {
      delete newSelectedSubjects[toDel];
    });

    this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'selectedSubjects', value: newSelectedSubjects });
    this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'subjects', value: mods });

    mods.forEach((mod) => {
      if (!this.$store.state.syllabus.selectedSubjects[mod]) {
        this.fetchSubjectDetails(mod);
      } else if (!this.$store.state.selectedSubjects[mod]) {
        this.setSelectedSubject(mod, this.$store.state.syllabus.selectedSubjects[mod]);
      }
    });
  },

};
