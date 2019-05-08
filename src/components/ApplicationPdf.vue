<template>
  <div>
    <v-toolbar fixed class="no-print">
      <v-toolbar-side-icon v-on:click="back()">
        <v-icon dark>keyboard_arrow_left</v-icon>
      </v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-on:click="getPdf()">
          <v-icon dark>get_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-container>
      <v-layout justify-center align-center>
        <div id="pdf" ref="pdf">
          <!-- date & city -->
          <div id="dateAndCity" class="element text-right">
            <span id="date">{{todaysDate}}</span>, Kraków
          </div>

          <!-- personal details -->
          <div id="personalDetails" class="element text-left">
            <p id="nameAndSurname">{{nameAndSurname}}</p>
            <p id="street">ul. {{street}}</p>
            <p id="zipAndCity">
              <span id="zipAndCity">{{zip}} {{city}}</span>
            </p>
            <p>
              Kierunek:
              <span id="fieldOfStudies">{{field}}</span>
            </p>
            <p>
              Stopień:
              <span id="cycle">{{cycle}}</span>
            </p>
            <p>
              Rodzaj:
              <span id="type">{{type}}</span>
            </p>
            <p>
              Rok:
              <span id="year">{{year}}</span>
            </p>
            <p>
              Nr. Indeksu:
              <span id="index">{{indexNumber}}</span>
            </p>
          </div>

          <!-- faculty details -->
          <div id="facultyDetails" class="element text-right">
            <p>Prodziekan ds.Kształcenia</p>
            <p id="faculty">{{dean.faculty}}</p>
            <p id="deansNameAndSurname">{{dean.nameAndSurname}}</p>
            <p id="university">Akademia Górniczo-Hutnicza</p>
            <p id="universityStreet">al. Adama Mickiewicza 30</p>
            <p id="universityZipAndCity">30-059 Kraków</p>
          </div>

          <!-- content -->
          <div id="content" class="row">
            <h3 id="title" class="text-center">Podanie</h3>
            <p>
              Zwracam się z uprzejmą prośbą o wyrażenie zgody na wpis na semestr
              <b
                id="term"
              >{{termName[term]}} ({{term}})</b> z
              deficytem punktowym
              <b id="ects">{{ects}}</b> ECTS, w roku akademickim
              <b id="yearForApplication">{{currentYear}}</b> z przedmiotów:
            </p>
            <ol id="subjects">
              <li
                v-for="([,subject]) in Object.entries(subjects)"
                v-bind:key="subject.name"
              >{{subject.name}}, {{subject.owner}}, {{subject.selectedActivities.toString()}}, {{getHoursForSubject(subject)}}h, {{subject.ects}} ECTS</li>
            </ol>
          </div>

          <!-- signature -->
          <div id="signature" class="row text-right">
            <h4>Podpis:</h4>
            <p>................................</p>
          </div>
        </div>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas";
import MutationTypes from "../constants/MutationTypes";
import { getTodaysDate, getCurrentYear } from "../helpers/dateHelper";

export default {
  name: "ApplicationForm",
  // beforeCreate() {
  //   this.$store.commit(MutationTypes.UPDATE_STORE, JSON.parse(localStorage.getItem('store')))
  // },
  computed: {
    termName() {
      return ["letni", "zimowy"];
    },
    nameAndSurname() {
      return this.$store.state.nameAndSurname;
    },
    indexNumber() {
      return this.$store.state.indexNumber;
    },
    street() {
      return this.$store.state.street;
    },
    zip() {
      return this.$store.state.zip;
    },
    city() {
      return this.$store.state.city;
    },
    faculty() {
      return this.$store.state.faculty;
    },
    type() {
      return this.$store.state.type;
    },
    term() {
      return this.$store.state.term;
    },
    cycle() {
      return this.$store.state.cycle;
    },
    year() {
      return this.$store.state.year;
    },
    field() {
      return this.$store.state.field;
    },
    subjects() {
      return this.$store.state.selectedSubjects;
    },
    dean() {
      return this.$store.state.dean;
    },
    ects() {
      let ects = 0;
      Object.entries(this.$store.state.selectedSubjects).forEach(
        ([, subject]) => {
          ects += subject.ects;
        }
      );
      return ects;
    },
    todaysDate() {
      return getTodaysDate();
    },
    currentYear() {
      return getCurrentYear();
    }
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    getHoursForSubject(subject) {
      let hours = 0;
      subject.selectedActivities.forEach(activity => {
        hours += subject.activities[activity];
      });
      return hours;
    },
    async getPdf() {
      return html2canvas(this.$refs.pdf, { scale: 1, dpi: 500 }).then(canvas => {
        const pdf = new jsPDF("p", "mm", "a4");
        const image = canvas.toDataURL("image/jpg", 1.0);
        pdf.addImage(image, "JPG", 0, 0, 210, 297);
        pdf.save("Application-For-Entry-With-ECTS-Deficit.pdf");
      });
    }
  }
};
</script>
