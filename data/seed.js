const Daycare = require('../lib/models/Daycare');

const seed = async ({ count = 3 }) => {
  const daycaresToCreate = [...Array(count)]
    .map(() => ({
      id: `${Math.floor(i / 2) + 1}`,
      name: 'Weinacker\'s Montessori School',
      street_address: '227 Hillcrest Road',
      city: 'Mobile',
      state: 'AL',
      zip_code: '36608',
      image: 'https://www.weinackersmontessori.com/wp-content/uploads/2019/09/Preschool-Circle-Time.png',
      phone_number: '251-344-8755',
      day: true,
      evening: true,
      infant: true,
      toddler: true,
      child: true,
      older_child: false,
      snacks: true,
      covid_plan: true
    }));

  await Promise.all(daycaresToCreate.map(daycare => Daycare.insert(daycare)
  ));
};

module.exports = { seed };
