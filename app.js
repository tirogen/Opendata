const express = require('express');
const path = require('path');
const logger = require('morgan');
const axios = require('axios');
const jsonxml = require('jsontoxml');
const fs = require('fs');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'opendata'
});
connection.connect();

const port = 3000;

const app = express();

app.listen(port, () => console.log(`This app listening at http://localhost:${port}`))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

app.get('/covid19/xml', (req, res) => {
  axios.get('https://opend.data.go.th/get-ckan/datastore_search?resource_id=93f74e67-6f76-4b25-8f5d-b485083100b6&limit=20', {
      headers: {
        'api-key': '2KnKI5JI75np3mY8J5MIsvfaGpwBHnDS'
      }
    })
    .then((response) => {
      const data = response.data.result.records;
      const xml = covid19(data, false);
      const fileName = Math.random().toString(36).substr(2, 10);
      fs.writeFileSync(`${__dirname}/public/download/xml_covid_${fileName}.xml`, xml);
      res.download(`${__dirname}/public/download/xml_covid_${fileName}.xml`);
    })
});

app.get('/covid19/dtd', (req, res) => {
  axios.get('https://opend.data.go.th/get-ckan/datastore_search?resource_id=93f74e67-6f76-4b25-8f5d-b485083100b6&limit=20', {
      headers: {
        'api-key': '2KnKI5JI75np3mY8J5MIsvfaGpwBHnDS'
      }
    })
    .then((response) => {
      const data = response.data.result.records;
      const xml = covid19(data, true);
      const fileName = Math.random().toString(36).substr(2, 10);
      fs.writeFileSync(`${__dirname}/public/download/dtd_covid_${fileName}.xml`, xml);
      res.download(`${__dirname}/public/download/dtd_covid_${fileName}.xml`);
    })
});

function covid19(data, isDTD){
    let xml = '<?xml version="1.0" encoding="UTF-8"?><covid19>';

    if(isDTD) xml += `
    <!DOCTYPE covid19 [
       <!ELEMENT covid19 [people*] >
       <!ELEMENT people (no,age,sex,nationality,province_isolation,notification_date,announce_date,province_onset,district_onset)>
       <!ELEMENT no (#PCDATA)>
       <!ELEMENT age (#PCDATA)>
       <!ELEMENT sex (#PCDATA)>
       <!ELEMENT nationality (#PCDATA)>
       <!ELEMENT province_isolation (#PCDATA)>
       <!ELEMENT notification_date (#PCDATA)>
       <!ELEMENT announce_date (#PCDATA)>
       <!ELEMENT province_onset (#PCDATA)>
       <!ELEMENT district_onset (#PCDATA)>
    ]>`;

    data.forEach((item, i) => {
      const { no, age, sex, nationality } = item;
      province_isolation = item['Province of isolation'];
      notification_date = item['Notification date'];
      announce_date = item['Announce Date'];
      province_onset = item['Province of onset'];
      district_onset = item['District of onset'];
      xml += `
        <people>
          <no>${no}</no>
          <age>${age}</age>
          <sex>${sex}</sex>
          <nationality>${nationality}</nationality>
          <province_isolation>${province_isolation}</province_isolation>
          <notification_date>${notification_date}</notification_date>
          <announce_date>${announce_date}</announce_date>
          <province_onset>${province_onset}</province_onset>
          <district_onset>${district_onset}</district_onset>
        </people>
      `;
      connection.query('insert into covid19 set no=?, age=?, sex=?, nationality=?, province_isolation=?, notification_date=?, announce_date=?, province_onset=?, district_onset=?', [no, age, sex, nationality, province_isolation, notification_date, announce_date, province_onset, district_onset], function (error, results, fields) {
        if (error) throw error;
      });
    });
    xml += '</covid19>';
    return xml;
}

app.get('/fish/xml', (req, res) => {
  axios.get('https://opend.data.go.th/get-ckan/datastore_search?resource_id=ce7f4a78-71db-4754-9084-edca971903bd&limit=20', {
      headers: {
        'api-key': '2KnKI5JI75np3mY8J5MIsvfaGpwBHnDS'
      }
    })
    .then((response) => {
      const data = response.data.result.records;
      const xml = fish(data, false);
      const fileName = Math.random().toString(36).substr(2, 10);
      fs.writeFileSync(`${__dirname}/public/download/xml_covid_${fileName}.xml`, xml);
      res.download(`${__dirname}/public/download/xml_covid_${fileName}.xml`);
    })
});

function fish(data, isDTD){
    let xml = '<?xml version="1.0" encoding="UTF-8"?><covid19>';

    if(isDTD) xml += `
    <!DOCTYPE covid19 [
       <!ELEMENT covid19 [people*] >
       <!ELEMENT people (no,age,sex,nationality,province_isolation,notification_date,announce_date,province_onset,district_onset)>
       <!ELEMENT no (#PCDATA)>
       <!ELEMENT age (#PCDATA)>
       <!ELEMENT sex (#PCDATA)>
       <!ELEMENT nationality (#PCDATA)>
       <!ELEMENT province_isolation (#PCDATA)>
       <!ELEMENT notification_date (#PCDATA)>
       <!ELEMENT announce_date (#PCDATA)>
       <!ELEMENT province_onset (#PCDATA)>
       <!ELEMENT district_onset (#PCDATA)>
    ]>`;

    data.forEach((item, i) => {
      const { no, age, sex, nationality } = item;
      province_isolation = item['Province of isolation'];
      notification_date = item['Notification date'];
      announce_date = item['Announce Date'];
      province_onset = item['Province of onset'];
      district_onset = item['District of onset'];
      xml += `
        <people>
          <no>${no}</no>
          <age>${age}</age>
          <sex>${sex}</sex>
          <nationality>${nationality}</nationality>
          <province_isolation>${province_isolation}</province_isolation>
          <notification_date>${notification_date}</notification_date>
          <announce_date>${announce_date}</announce_date>
          <province_onset>${province_onset}</province_onset>
          <district_onset>${district_onset}</district_onset>
        </people>
      `;
      connection.query('insert into covid19 set no=?, age=?, sex=?, nationality=?, province_isolation=?, notification_date=?, announce_date=?, province_onset=?, district_onset=?', [no, age, sex, nationality, province_isolation, notification_date, announce_date, province_onset, district_onset], function (error, results, fields) {
        if (error) throw error;
      });
    });
    xml += '</covid19>';
    return xml;
}