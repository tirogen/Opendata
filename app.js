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
    data = JSON.parse(JSON.stringify(data).replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\&/g, "&amp;").replace(/\'/g, "&apos;"));
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    if(isDTD) xml += `
    <!DOCTYPE covid19 [
      <!ELEMENT covid19 (people)+>
      <!ATTLIST covid19
      xmlns CDATA #FIXED ''>

      <!ELEMENT people (no,age,sex,nationality,province_isolation,
                    notification_date,announce_date,province_onset,
                    district_onset)>
      <!ATTLIST people
      xmlns CDATA #FIXED ''>

      <!ELEMENT no (#PCDATA)>
      <!ATTLIST no
      xmlns CDATA #FIXED ''>

      <!ELEMENT age (#PCDATA)>
      <!ATTLIST age
      xmlns CDATA #FIXED ''>

      <!ELEMENT sex (#PCDATA)>
      <!ATTLIST sex
      xmlns CDATA #FIXED ''>

      <!ELEMENT nationality (#PCDATA)>
      <!ATTLIST nationality
      xmlns CDATA #FIXED ''>

      <!ELEMENT province_isolation (#PCDATA)>
      <!ATTLIST province_isolation
      xmlns CDATA #FIXED ''>

      <!ELEMENT notification_date (#PCDATA)>
      <!ATTLIST notification_date
      xmlns CDATA #FIXED ''>

      <!ELEMENT announce_date (#PCDATA)>
      <!ATTLIST announce_date
      xmlns CDATA #FIXED ''>

      <!ELEMENT province_onset (#PCDATA)>
      <!ATTLIST province_onset
      xmlns CDATA #FIXED ''>

      <!ELEMENT district_onset (#PCDATA)>
      <!ATTLIST district_onset
      xmlns CDATA #FIXED ''>
    ]>`;
    xml += '<covid19>';
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
        connection.query('insert into covid19 set no=?, age=?, sex=?, nationality=?, province_isolation=?, notification_date=?, announce_date=?, province_onset=?, district_onset=?', [no, age, sex, nationality, province_isolation, notification_date, announce_date, province_onset, district_onset],  (error) => {
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
      fs.writeFileSync(`${__dirname}/public/download/xml_fish_${fileName}.xml`, xml);
      res.download(`${__dirname}/public/download/xml_fish_${fileName}.xml`);
    })
});

app.get('/fish/dtd', (req, res) => {
  axios.get('https://opend.data.go.th/get-ckan/datastore_search?resource_id=ce7f4a78-71db-4754-9084-edca971903bd&limit=20', {
      headers: {
        'api-key': '2KnKI5JI75np3mY8J5MIsvfaGpwBHnDS'
      }
    })
    .then((response) => {
      const data = response.data.result.records;
      const xml = fish(data, true);
      const fileName = Math.random().toString(36).substr(2, 10);
      fs.writeFileSync(`${__dirname}/public/download/dtd_fish_${fileName}.xml`, xml);
      res.download(`${__dirname}/public/download/dtd_fish_${fileName}.xml`);
    })
});

function fish(data, isDTD){
    data = JSON.parse(JSON.stringify(data).replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\&/g, "&amp;").replace(/\'/g, "&apos;"));
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    if(isDTD) xml += `
    <!DOCTYPE fish [
      <!ELEMENT aquatic_animals (fish)+>
      <!ATTLIST aquatic_animals
        xmlns CDATA #FIXED ''>

      <!ELEMENT fish (no,kind,name,local_name,common_name,scientific_name,
                      family_name,public_year,biology,habitat,status,
                      image_source,image_name,image_path_small,
                      image_path_big)>
      <!ATTLIST fish
        xmlns CDATA #FIXED ''>

      <!ELEMENT no (#PCDATA)>
      <!ATTLIST no
        xmlns CDATA #FIXED ''>

      <!ELEMENT kind (#PCDATA)>
      <!ATTLIST kind
        xmlns CDATA #FIXED ''>

      <!ELEMENT name (#PCDATA)>
      <!ATTLIST name
        xmlns CDATA #FIXED ''>

      <!ELEMENT local_name (#PCDATA)>
      <!ATTLIST local_name
        xmlns CDATA #FIXED ''>

      <!ELEMENT common_name (#PCDATA)>
      <!ATTLIST common_name
        xmlns CDATA #FIXED ''>

      <!ELEMENT scientific_name (#PCDATA)>
      <!ATTLIST scientific_name
        xmlns CDATA #FIXED ''>

      <!ELEMENT family_name (#PCDATA)>
      <!ATTLIST family_name
        xmlns CDATA #FIXED ''>

      <!ELEMENT public_year (#PCDATA)>
      <!ATTLIST public_year
        xmlns CDATA #FIXED ''>

      <!ELEMENT biology (#PCDATA)>
      <!ATTLIST biology
        xmlns CDATA #FIXED ''>

      <!ELEMENT habitat (#PCDATA)>
      <!ATTLIST habitat
        xmlns CDATA #FIXED ''>

      <!ELEMENT status (#PCDATA)>
      <!ATTLIST status
        xmlns CDATA #FIXED ''>

      <!ELEMENT image_source (#PCDATA)>
      <!ATTLIST image_source
        xmlns CDATA #FIXED ''>

      <!ELEMENT image_name (#PCDATA)>
      <!ATTLIST image_name
        xmlns CDATA #FIXED ''>

      <!ELEMENT image_path_small (#PCDATA)>
      <!ATTLIST image_path_small
        xmlns CDATA #FIXED ''>

      <!ELEMENT image_path_big (#PCDATA)>
      <!ATTLIST image_path_big
        xmlns CDATA #FIXED ''>
    ]>`;
    xml += '<aquatic_animals>';
    data.forEach((item, i) => {
      no = item['รหัสสัตว์น้ำ'];
      kind = item['ชนิดสัตว์น้ำ'];
      name = item['ชื่อไทย'];
      local_name = item['ชื่อท้องถิ่น'];
      common_name = item['ชื่อสามัญ'];
      scientific_name = item['ชื่อวิทยาศาสตร์'];
      family_name = item['ชื่อวงศ์สัตว์น้ำ'];
      public_year = item['ชื่อ/ปีที่เผยแพร่'];
      biology = item['ลักษณะชีววิทยาทั่วไป'];
      habitat = item['ถิ่นที่อาศัย'];
      status = item['สถานะภาพ'];
      image_source = item['ที่มาของภาพ'];
      image_name = item['ชื่อภาพ'];
      image_path_small = item['Path เก็บภาพ (เล็ก)'];
      image_path_big = item['Path เก็บภาพ (ใหญ่)'];
      xml += `
        <fish>
          <no>${no}</no>
          <kind>${kind}</kind>
          <name>${name}</name>
          <local_name>${local_name}</local_name>
          <common_name>${common_name}</common_name>
          <scientific_name>${scientific_name}</scientific_name>
          <family_name>${family_name}</family_name>
          <public_year>${public_year}</public_year>
          <biology>${biology}</biology>
          <habitat>${habitat}</habitat>
          <status>${status}</status>
          <image_source>${image_source}</image_source>
          <image_name>${image_name}</image_name>
          <image_path_small>${image_path_small}</image_path_small>
          <image_path_big>${image_path_big}</image_path_big>
        </fish>
      `;
        connection.query('insert into fish set no=?, kind=?, name=?, local_name=?, common_name=?, scientific_name=?, family_name=?, public_year=?, biology=?, habitat=?, status=?, image_source=?, image_name=?, image_path_small=?, image_path_big=?', [no, kind, name, local_name, common_name, scientific_name, family_name, public_year, biology, habitat, status, image_source, image_name, image_path_small, image_path_big], (error) => {
          if (error) throw error;
        });
    });
    xml += '</aquatic_animals>';
    return xml;
}
