const Daycare = require('../lib/models/Daycare');
const daycareData = require('../data/daycareData');

const seed = async () => {
  const daycaresToCreate = [...daycareData]
    .map(daycare => ({
      name: daycare.name,
      streetAddress: daycare.street_address,
      city: daycare.city,
      state: daycare.state,
      zipCode: daycare.zip_code,
      image: daycare.image,
      phoneNumber: daycare.phone_number,
      day: daycare.day,
      evening: daycare.evening,
      infant: daycare.infant,
      toddler: daycare.toddler,
      child: daycare.child,
      olderChild: daycare.older_child,
      snacks: daycare.snacks,
      covidPlan: daycare.covid_plan,
      price: daycare.price
    }));

  await Promise.all(daycaresToCreate.map(daycare => Daycare.insert(daycare)
  ));
};

module.exports = { seed };
