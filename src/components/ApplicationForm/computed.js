import MutationTypes from '../../constants/MutationTypes';
import RequestStatuses from '../../constants/RequestStatuses';

export default {
  nameAndSurname: {
    get() { return this.$store.state.nameAndSurname; },
    set(value) { this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'nameAndSurname', value }); },
  },
  indexNumber: {
    get() { return this.$store.state.indexNumber; },
    set(value) { this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'indexNumber', value }); },
  },
  street: {
    get() { return this.$store.state.street; },
    set(value) { this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'street', value }); },
  },
  zip: {
    get() { return this.$store.state.zip; },
    set(value) { this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'zip', value }); },
  },
  city: {
    get() { return this.$store.state.city; },
    set(value) { this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'city', value }); },
  },
  faculty: {
    get() { return this.$store.state.faculty.toUpperCase(); },
    set(value) {
      this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'faculty', value: value.toLowerCase() });
      if (this.$store.state.faculty) {
        this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'field', value: '' });
        this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'subjects', value: [] });
        this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'selectedSubjects', value: {} });
      }
      this.updateDean();
      this.setAvailableFields();
      this.setAvailableSubjects();
    },
  },
  year: {
    get() { return this.$store.state.year; },
    set(value) {
      this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'year', value });

      if (this.$store.state.year) {
        this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'field', value: '' });
        this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'subjects', value: [] });
        this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'selectedSubjects', value: {} });
      }
      this.setAvailableFields();
      this.setAvailableSubjects();
    },
  },
  type: {
    get() { return this.$store.state.type; },
    set(value) {
      if (this.$store.state.type) {
        this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'field', value: '' });
        this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'subjects', value: [] });
        this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'selectedSubjects', value: {} });
      }
      this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'type', value });
    },
  },
  cycle: {
    get() { return this.$store.state.cycle; },
    set(value) {
      this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'cycle', value });
      if (this.$store.state.cycle) {
        this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'field', value: '' });
        this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'subjects', value: [] });
        this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'selectedSubjects', value: {} });
      }
      this.setAvailableFields();
      this.setAvailableSubjects();
    },
  },
  term: {
    get() { return this.$store.state.term; },
    set(value) { this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'term', value }); },
  },
  field: {
    get() { return this.$store.state.field; },
    set(value) {
      this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'field', value });
      if (this.$store.state.field) {
        this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'subjects', value: [] });
        this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'selectedSubjects', value: {} });
      }
      this.setAvailableSubjects();
    },
  },
  subjects: {
    get() { return this.$store.state.subjects; },
    set(value) {
      this.addSubject(value);
      this.$store.commit(MutationTypes.UPDATE_PROPERTY, { key: 'subjects', value });
    },
  },
  price() {
    let price = 0;
    Object.entries(this.$store.state.subjects).forEach(([, subjectName]) => {
      const subject = this.$store.state.syllabus.selectedSubjects[subjectName];
      Object.entries(subject.activities).forEach(([, activityPrice]) => {
        price += subject.price * activityPrice;
      });
    });
    return price;
  },
  selectedSubjects() { return this.$store.state.selectedSubjects; },

  availableFaculties() { return this.$store.state.syllabus.faculties; },
  availableTypes() { return this.$store.state.syllabus.types; },
  availableCycles() { return this.$store.state.syllabus.cycles; },
  availableYears() { return this.$store.state.syllabus.years; },
  availableFields() { return this.$store.state.syllabus.fields; },
  availableSubjects() { return this.$store.state.syllabus.subjects; },
  isLoading() { return this.$store.state.status === RequestStatuses.LOADING; },
};
