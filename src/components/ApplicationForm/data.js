export default function () {
  return {
    valid: false,
    nameAndSurnameRules: [
      v => !!v || 'Name and surname are required',
      v => (v || '').length < 50
        || 'Name and surname must have less than 50 characters',
      v => /(([a-zA-Ząśń]+) ([a-zA-Ząśń]+(-[a-zA-Ząśń]+)?))$/.test(v)
        || 'Name and surname can contain only letters and must be separated with single space',
    ],
    indexNumberRules: [
      v => !!v || 'Index number is required',
      v => /\d{6}/.test(v) || 'Index number must consist of 6 digits',
    ],
    termRules: [
      v => !!v || 'Term is required',
      v => v > 0 && v < 8,
    ],
    streetRules: [
      v => !!v || 'Street is required',
    ],
    zipRules: [
      v => !!v || 'Zip is required',
      v => /\d{2}-\d{3}/.test(v) || 'Zip mus be separated with dash (e.g. 00-000).',
    ],
    cityRules: [
      v => !!v || 'City is required',
    ],
    facultyRules: [v => !!v || 'Faculty is required'],
    typeRules: [v => !!v || 'Type of studies is required'],
    cycleRules: [v => !!v || 'Cycle of studies is required'],
    yearRules: [v => !!v || 'Year of studies (start) is required'],
    fieldRules: [v => !!v || 'Filed of studies is required'],
    subjectsRules: [v => !!v || 'Subjects are required'],
  };
}
