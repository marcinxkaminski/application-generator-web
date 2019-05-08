<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-container>
      <v-layout px-2 wrap justify-center align-center>
        <v-flex xs12 mb-2>
          <v-img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Znak_graficzny_AGH.svg/768px-Znak_graficzny_AGH.svg.png"
            max-height="150"
            contain
          />
        </v-flex>

        <v-flex xs12 sm6 md5>
          <v-text-field
            v-model="nameAndSurname"
            :rules="nameAndSurnameRules"
            :count="50"
            label="Name & Surname"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 md5>
          <v-text-field
            v-model="indexNumber"
            :rules="indexNumberRules"
            :count="6"
            label="Index"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm5 md4>
          <v-text-field v-model="street" :rules="streetRules" label="Street" required></v-text-field>
        </v-flex>

        <v-flex xs12 sm2 md2>
          <v-text-field v-model="zip" :rules="zipRules" label="Zip Code" required></v-text-field>
        </v-flex>

        <v-flex xs12 sm5 md4>
          <v-text-field v-model="city" :rules="cityRules" label="City" required></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 md5 d-flex>
          <v-select v-model="faculty" :items="availableFaculties" label="Faculty" required/>
        </v-flex>

        <v-flex xs12 sm6 md5 d-flex>
          <v-select v-model="year" :items="availableYears" label="Year" required/>
        </v-flex>

        <v-flex xs12 sm6 md5 d-flex>
          <v-select v-model="type" :items="availableTypes" label="Type" required/>
        </v-flex>

        <v-flex xs12 sm6 md5 d-flex>
          <v-select v-model="cycle" :items="availableCycles" label="Cycle" required/>
        </v-flex>

        <v-flex xs12 sm6 md5 d-flex>
          <v-select v-model="field" :items="availableFields" label="Field of studies" required/>
        </v-flex>

        <v-flex xs12 sm6 md5 d-flex>
          <v-text-field
            v-model="term"
            type="number"
            min="1"
            max="7"
            :count="1"
            :rules="termRules"
            label="Term"
            required
          />
        </v-flex>

        <v-flex xs12 md10 d-flex>
          <v-select
            v-model="subjects"
            :items="availableSubjects"
            label="Subjects"
            chips
            deletable-chips
            multiple
            required
          />
        </v-flex>

        <v-flex xs12 md10 px-0>
          <v-list three-line>
            <v-subheader>Selected Subjects</v-subheader>
            <template v-for="([, subject]) in Object.entries(selectedSubjects)">
              <v-list-tile :key="subject.code">
                <v-layout>
                  <v-flex xs12 md6 px-0>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ subject.name }}</v-list-tile-title>
                      <v-list-tile-sub-title>
                        {{ subject.owner }},
                        ECTS: {{ subject.ects }}
                      </v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-flex>
                  <v-flex xs12 md6 px-0>
                    <v-select
                      v-model="subject.selectedActivities"
                      :items="Object.keys(subject.activities)"
                      label="Activities"
                      chips
                      deletable-chips
                      multiple
                      required
                    />
                  </v-flex>
                </v-layout>
              </v-list-tile>
            </template>
          </v-list>
        </v-flex>

        <v-flex xs12 md8 px-0>
          <v-btn color="green darken-3 white--text" :disabled="!valid" @click="submit">Generate</v-btn>
          <v-btn color="red darken-4 white--text" @click="reset">Reset Form</v-btn>
          <v-progress-circular :width="3" color="green" v-if="!!isLoading" indeterminate></v-progress-circular>
        </v-flex>
        <v-flex xs12 md2 align-items-end>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn block color="black" dark v-on="on">
                <v-icon dark left>monetization_on</v-icon>
                {{ price }} PLN
              </v-btn>
            </template>
            <span>Actual price can differ from the price above.</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<!-- Script -->
<script>
import data from './data';
import methods from './methods';
import computed from './computed';

export default {
  name: 'ApplicationForm',
  created() {
    this.setAvailableFaculties();
    this.setAvailableYears();
    this.setAvailableTypes();
    this.setAvailableCycles();
  },
  data,
  methods,
  computed,
};
</script>
