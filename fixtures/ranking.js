export default {
  tiers: [
    { id: 1, name: 'Rising Star', img: '/img/tiers/risingstar.png' },
    { id: 2, name: 'Shining Star', img: '/img/tiers/shiningstar.png' },
    { id: 3, name: 'Shooting Star', img: '/img/tiers/shootingstar.png' },
    { id: 4, name: 'Superstar', img: '/img/tiers/superstar.png' },
    { id: 5, name: 'Megastar', img: '/img/tiers/megastar.png' },
  ],
  prospects: [
    { id: 1, title: 'Rising Star', tier_id: 1, min: 1, max: 60 },
    { id: 2, title: 'Shining Star', tier_id: 2, min: 61, max: 240 },
    { id: 3, title: 'Shooting Star', tier_id: 3, min: 241, max: 480 },
    { id: 4, title: 'Superstar', tier_id: 4, min: 481, max: 800 },
    { id: 5, title: 'Megastar', tier_id: 5, min: 801, max: -1 }, // -1 > Anv value greater than `min`
  ]
}
