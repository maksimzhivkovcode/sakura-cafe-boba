'use strict';

/**
 * Adds data-fi / data-en to static menu copy (runs once on load).
 */

const MENU_DESC_EN = {
  'Japanilainen vihreä tee, maito ja makeus.': 'Japanese green tea, milk and sweetness.',
  'Matcha, mansikka ja maito.': 'Matcha, strawberry and milk.',
  'Matcha ja taro-maku.': 'Matcha and taro flavour.',
  'Matcha, mango ja maito.': 'Matcha, mango and milk.',
  'Matcha ja suklaa.': 'Matcha and chocolate.',
  'Talomaitotee, pehmeä ja kermainen.': 'House milk tea, smooth and creamy.',
  'Suklaamaitotee ja tapioka.': 'Chocolate milk tea and tapioca.',
  'Matcha-maidotee, mochi-tyylinen makeus.': 'Matcha milk tea with mochi-style sweetness.',
  'Klassinen maitotee ja purukypsät tapioka-helmet.': 'Classic milk tea and chewy pearls.',
  'Maitotee ja kookoshyytelö.': 'Milk tea and coconut jelly.',
  'Taromaitotee ja boba-helmet.': 'Taro milk tea and boba pearls.',
  'Pistaasimaito ja pehmeä makeus.': 'Pistachio milk and gentle sweetness.',
  'Ramen-nuudelit, liemi, chashu-possu, kananmuna, valkosipuli, baby bok choy ja kevätsipuli.':
    'Ramen noodles, broth, chashu pork, egg, garlic, baby bok choy and spring onion.',
  'Ramen-nuudelit, liemi, katkarapu, valkosipuli, baby bok choy ja kevätsipuli.':
    'Ramen noodles, broth, shrimp, garlic, baby bok choy and spring onion.',
  'Riisiä, kanaa, makea-hapan chilikastiketta, sipulia, kurkkua ja tomaattia.':
    'Rice, chicken, sweet-sour chilli sauce, onion, cucumber and tomato.',
  'Ramen-nuudelit, liemi, naudanliha, kananmuna, bok choy, kimchi, valkosipuli ja kevätsipuli.':
    'Ramen noodles, broth, beef, egg, bok choy, kimchi, garlic and spring onion.',
  'Ramen-nuudelit, tofu, kasvisliemi, shiitake, baby bok choy, valkosipuli ja kevätsipuli.':
    'Ramen noodles, tofu, vegetable broth, shiitake, baby bok choy, garlic and spring onion.',
  'Nauta, riisinuudelit ja naudanliemi.': 'Beef, rice noodles and beef broth.',
  'Kana, riisinuudelit ja kanaliemi.': 'Chicken, rice noodles and chicken broth.',
  'Katkarapu, riisinuudelit ja liemi.': 'Shrimp, rice noodles and broth.',
  'Tofu, riisinuudelit ja liemi.': 'Tofu, rice noodles and broth.',
  'Nautapallot, nuudelit ja liemi.': 'Beef meatballs, noodles and broth.',
  'Lapsille sopiva annos pho-liemellä.': 'Child-sized portion with pho broth.',
  'Nauta, riisi, teriyaki ja tuoreet kasvikset.': 'Beef, rice, teriyaki and fresh vegetables.',
  'Kana, riisi, teriyaki ja tuoreet kasvikset.': 'Chicken, rice, teriyaki and fresh vegetables.',
  'Katkarapu, riisi, teriyaki ja tuoreet kasvikset.': 'Shrimp, rice, teriyaki and fresh vegetables.',
  'Tonnikala, riisi, teriyaki ja tuoreet kasvikset.': 'Tuna, rice, teriyaki and fresh vegetables.',
  'Tofu, riisi, teriyaki ja tuoreet kasvikset.': 'Tofu, rice, teriyaki and fresh vegetables.',
  'Riisi, kana, teriyaki, seesaminsiemenet ja nori.': 'Rice, chicken, teriyaki, sesame seeds and nori.',
  'Riisi, nauta, teriyaki, seesaminsiemenet ja nori.': 'Rice, beef, teriyaki, sesame seeds and nori.',
  'Riisi, tonnikala, majoneesi, seesaminsiemenet ja nori.':
    'Rice, tuna, mayonnaise, sesame seeds and nori.',
  'Riisi, katkarapu, majoneesi, seesaminsiemenet ja nori.':
    'Rice, shrimp, mayonnaise, sesame seeds and nori.',
  'Kurkku, porkkana, kevätsipuli, kana, korianteri ja kastike.':
    'Cucumber, carrot, spring onion, chicken, coriander and sauce.',
  'Kurkku, porkkana, nauta, korianteri ja kastike.':
    'Cucumber, carrot, beef, coriander and sauce.',
  'Kurkku, porkkana, sika, korianteri ja kastike.':
    'Cucumber, carrot, pork, coriander and sauce.',
  'Kurkku, porkkana, tonnikala, korianteri ja kastike.':
    'Cucumber, carrot, tuna, coriander and sauce.',
  'Paistetut katkaravut, 5 kpl.': 'Fried shrimp, 5 pcs.',
  'Kanatäytteiset kevätrullat, 4 kpl.': 'Chicken spring rolls, 4 pcs.',
  'Kasviskevätrullat, 4 kpl.': 'Vegetable spring rolls, 4 pcs.',
};

function bootstrapMenuI18n() {
  document.querySelectorAll('.menu-card__desc').forEach((element) => {
    const fi = element.textContent.trim();

    if (!element.getAttribute('data-fi')) {
      element.setAttribute('data-fi', fi);
    }

    const en = MENU_DESC_EN[fi];

    if (en && !element.getAttribute('data-en')) {
      element.setAttribute('data-en', en);
    }
  });
}
