const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Daycare = require('../lib/models/Daycare');
const { exception } = require('console');
require('../data/data_helper');

describe('BabyMe routes', () => {
  it('creates a new daycare via POST', () => {
    return request(app)
      .post('/api/v1/daycares')
      .send({
        name: 'Weinacker\'s Montessori School',
        streetAddress: '227 Hillcrest Road',
        city: 'Mobile',
        state: 'AL',
        zipCode: '36608',
        image: 'https://www.weinackersmontessori.com/wp-content/uploads/2019/09/Preschool-Circle-Time.png',
        phoneNumber: '251-344-8755',
        day: true,
        evening: true,
        infant: true,
        toddler: true,
        child: true,
        olderChild: false,
        snacks: true,
        covidPlan: true
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Weinacker\'s Montessori School',
          streetAddress: '227 Hillcrest Road',
          city: 'Mobile',
          state: 'AL',
          zipCode: '36608',
          image: 'https://www.weinackersmontessori.com/wp-content/uploads/2019/09/Preschool-Circle-Time.png',
          phoneNumber: '251-344-8755',
          day: true,
          evening: true,
          infant: true,
          toddler: true,
          child: true,
          olderChild: false,
          snacks: true,
          covidPlan: true
        });
      });
  });

  it('finds all daycares via GET', async () => {
    const daycares = await Promise.all([
      Daycare.insert({
        name: 'Weinacker\'s Montessori School',
        streetAddress: '227 Hillcrest Road',
        city: 'Mobile',
        state: 'AL',
        zipCode: '36608',
        image: 'https://www.weinackersmontessori.com/wp-content/uploads/2019/09/Preschool-Circle-Time.png',
        phoneNumber: '251-344-8755',
        day: true,
        evening: true,
        infant: true,
        toddler: true,
        child: true,
        olderChild: false,
        snacks: true,
        covidPlan: true
      }),
      Daycare.insert({
        name: 'Green Tree Early Childhood Center',
        streetAddress: '1200 6th Avenue, Suite 200',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        image: 'https://greentreechildcare.com/wp-content/uploads/2017/11/today-022.jpg',
        phoneNumber: '206-553-8212',
        day: true,
        evening: true,
        infant: true,
        toddler: true,
        child: false,
        olderChild: false,
        snacks: true,
        covidPlan: true
      })
    ]);

    return request(app)
      .get('/api/v1/daycares')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining(daycares));
      });
  });

  it('finds a daycare by id', async () => {
    const daycare = await Daycare.insert({
      name: 'Weinacker\'s Montessori School',
      streetAddress: '227 Hillcrest Road',
      city: 'Mobile',
      state: 'AL',
      zipCode: '36608',
      image: 'https://www.weinackersmontessori.com/wp-content/uploads/2019/09/Preschool-Circle-Time.png',
      phoneNumber: '251-344-8755',
      day: true,
      evening: true,
      infant: true,
      toddler: true,
      child: true,
      olderChild: false,
      snacks: true,
      covidPlan: true
    });

    return request(app)
      .get(`/api/v1/daycares/${daycare.id}`)
      .then(res => {
        expect(res.body).toEqual(daycare);
      });
  });

  it('updates a daycare by id', async () => {
    const daycare = await Daycare.insert({
      name: 'Weinacker\'s Montessori School',
      streetAddress: '227 Hillcrest Road',
      city: 'Mobile',
      state: 'AL',
      zipCode: '36608',
      image: 'https://www.weinackersmontessori.com/wp-content/uploads/2019/09/Preschool-Circle-Time.png',
      phoneNumber: '251-344-8755',
      day: true,
      evening: true,
      infant: true,
      toddler: true,
      child: true,
      olderChild: false,
      snacks: true,
      covidPlan: true
    });

    return request(app)
      .put(`/api/v1/daycares/${daycare.id}`)
      .send({
        name: 'Weinacker\'s Montessori School',
        streetAddress: '123 Main Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '98765',
        image: 'https://www.weinackersmontessori.com/wp-content/uploads/2019/09/Preschool-Circle-Time.png',
        phoneNumber: '251-344-8755',
        day: true,
        evening: true,
        infant: true,
        toddler: true,
        child: true,
        olderChild: false,
        snacks: true,
        covidPlan: true
      });
  });

  it('deletes a daycare by id', async () => {
    const daycare = await Daycare.insert({
      name: 'Weinacker\'s Montessori School',
      streetAddress: '227 Hillcrest Road',
      city: 'Mobile',
      state: 'AL',
      zipCode: '36608',
      image: 'https://www.weinackersmontessori.com/wp-content/uploads/2019/09/Preschool-Circle-Time.png',
      phoneNumber: '251-344-8755',
      day: true,
      evening: true,
      infant: true,
      toddler: true,
      child: true,
      olderChild: false,
      snacks: true,
      covidPlan: true
    });

    return request(app)
      .delete(`/api/v1/daycares/${daycare.id}`)
      .then(res => {
        expect(res.body).toEqual(daycare);
      });
  });
});
