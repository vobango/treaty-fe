export const screens = {
  DESKTOP_MIN_WIDTH: 1445
};

export const jobTypes = [
  'typeHelp',
  'typeConcrete',
  'typeElectricity',
  'typeSlantedRoof',
  'typePlaster',
  'typeAirConditioning',
  'typeFlatRoof',
  'typeDemolition',
  'typeAssembly',
  'typeWall',
  'typeWeakCurrent',
  'typeObjectManagement',
  'typeTiling',
  'typeTin',
  'typeProjectManagement',
  'typeWoodwork',
  'typeFlooring',
  'typeRestoration',
  'typeInteriorDecoration',
  'typeWorkManagement',
  'typePlumbing',
  'typeVentilation',
  'typeGeneralConstruction'
];

// Separate different area types so
// they can be sorted alphabetically within types but kept separate otherwise
export const workAreas = {
  cities: ['tallinn', 'tartu'],
  counties: [
    'countyHarju',
    'countyTartu',
    'countyIdaViru',
    'countyParnu',
    'countyLaaneViru',
    'countyViljandi',
    'countyRapla',
    'countyVoru',
    'countySaare',
    'countyJogeva',
    'countyJarva',
    'countyValga',
    'countyPolva',
    'countyLaane',
    'countyHiiu'
  ],
  countries: ['finland', 'sweden', 'norway', 'europe']
};

export const queryConfig = {refetchAllOnWindowFocus: false};
