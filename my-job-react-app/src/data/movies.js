import obsessionPoster from '../assets/posters/obsession.jpg';
import interstellarPoster from '../assets/posters/interstellar.jpg';
import martySupremePoster from '../assets/posters/marty-supreme.jpg';
import drivePoster from '../assets/posters/drive.jpg';
import uncutGemsPoster from '../assets/posters/uncut-gems.jpg';
import nopePoster from '../assets/posters/nope.jpg';
import usPoster from '../assets/posters/us.jpg';
import pastLivesPoster from '../assets/posters/past-lives.jpg';
import aboutTimePoster from '../assets/posters/about-time.jpg';
import lostInTranslationPoster from '../assets/posters/lost-in-translation.jpg';
import inTheMoodForLovePoster from '../assets/posters/in-the-mood-for-love.jpg';
import poster2046 from '../assets/posters/2046.jpg';
import theLobsterPoster from '../assets/posters/the-lobster.jpg';
import fargoPoster from '../assets/posters/fargo.jpg';
import trainspottingPoster from '../assets/posters/trainspotting.jpg';
import americanPsychoPoster from '../assets/posters/american-psycho.jpg';

export const categories = ['All Reviews', 'Thriller', 'Sci-Fi', 'Horror', 'Romance', 'Comedy'];

export const AUTHOR_BIO =
  'I am a pet enthusiast and freelance writer who loves exploring the stories behind every film. Whether it is a quiet romance or a high-tension thriller, I enjoy unpacking what makes a movie linger long after the credits.';

function createContent(filmName, intro, sections) {
  return { intro, sections };
}

export const moviesData = [
  {
    id: 1,
    slug: 'obsession',
    image: obsessionPoster,
    tag: 'Thriller',
    title: 'Obsession: A Gripping Psychological Thriller That Keeps You Guessing',
    description:
      'Dive deep into the dark corners of human desire and obsession. This film delivers a masterclass in suspense, tension-building, and an unpredictable plot that...',
    author: 'Thompson P.',
    date: '22 June 2026',
    content: createContent(
      'Obsession',
      'Dive deep into the dark corners of human desire and obsession. This film delivers a masterclass in suspense, tension-building, and an unpredictable plot that refuses to let go until the final frame.',
      [
        {
          heading: '1. Tension That Never Lets Up',
          paragraphs: [
            'From the opening scene, Obsession establishes a mood of unease. Every conversation feels loaded, and every quiet moment threatens to break into something darker.',
          ],
        },
        {
          heading: '2. Characters Driven by Desire',
          paragraphs: [
            'The performances make the psychological spiral believable. You watch people make choices they know are wrong, and still understand why they cannot stop.',
          ],
        },
        {
          heading: '3. Why It Stays With You',
          paragraphs: ['A few details elevate the film beyond a standard thriller:'],
          bullets: [
            { label: 'Pacing:', text: 'Slow enough to build dread, sharp enough to surprise.' },
            { label: 'Atmosphere:', text: 'Visuals and sound design keep you unsettled.' },
            { label: 'Ending:', text: 'Ambiguous enough to spark debate after the credits.' },
          ],
        },
      ],
    ),
  },
  {
    id: 2,
    slug: 'interstellar',
    image: interstellarPoster,
    tag: 'Sci-Fi',
    title: 'Interstellar: A Mind-Bending Masterpiece of Space and Time',
    description:
      "Christopher Nolan's sci-fi epic remains a monumental achievement. Blending hard science with a deeply emotional core, it explores love's power across dimensions and...",
    author: 'Thompson P.',
    date: '20 June 2026',
    content: createContent(
      'Interstellar',
      "Christopher Nolan's sci-fi epic remains a monumental achievement. Blending hard science with a deeply emotional core, it explores love's power across dimensions and the human will to survive.",
      [
        {
          heading: '1. Science With Heart',
          paragraphs: [
            'The film treats physics seriously without losing its emotional center. Wormholes and time dilation become tools for storytelling, not just spectacle.',
          ],
        },
        {
          heading: '2. A Father-Daughter Story Across Space',
          paragraphs: [
            'At its core, Interstellar is about connection that outlasts distance. The relationship between Cooper and Murph gives the cosmic scale a human face.',
          ],
        },
        {
          heading: '3. What Makes It Endure',
          paragraphs: ['Years later, the film still feels monumental because of:'],
          bullets: [
            { label: 'Score:', text: "Hans Zimmer's organ-driven music feels vast and intimate." },
            { label: 'Visuals:', text: 'Space sequences remain breathtaking and purposeful.' },
            { label: 'Theme:', text: 'Love as a force as real as gravity.' },
          ],
        },
      ],
    ),
  },
  {
    id: 3,
    slug: 'marty-supreme',
    image: martySupremePoster,
    tag: 'Drama',
    title: 'Marty Supreme: A Stylish and Energetic Look at Subculture',
    description:
      'An extraordinary journey through a unique world. With brilliant performances and a sharp, witty script, this movie manages to turn an unexpected sport into an engaging...',
    author: 'Thompson P.',
    date: '18 June 2026',
    content: createContent(
      'Marty Supreme',
      'An extraordinary journey through a unique world. With brilliant performances and a sharp, witty script, this movie manages to turn an unexpected sport into an engaging character study.',
      [
        {
          heading: '1. Style With Substance',
          paragraphs: [
            'The film looks and moves with confidence. Energy on screen never feels empty because every flourish serves character and mood.',
          ],
        },
        {
          heading: '2. A Subculture Brought to Life',
          paragraphs: [
            'Instead of explaining the world from the outside, Marty Supreme drops you into it and lets the culture reveal itself through people and places.',
          ],
        },
        {
          heading: '3. Why It Works',
          paragraphs: ['Three strengths keep the story humming:'],
          bullets: [
            { label: 'Casting:', text: 'Performances feel lived-in and specific.' },
            { label: 'Dialogue:', text: 'Witty without becoming self-conscious.' },
            { label: 'Pace:', text: 'Stylish momentum that still leaves room to breathe.' },
          ],
        },
      ],
    ),
  },
  {
    id: 4,
    slug: 'drive',
    image: drivePoster,
    tag: 'Action',
    title: 'Drive: Neon-Drenched Noir with a Stunning Atmospheric Style',
    description:
      'A silent driver, a killer soundtrack, and beautiful hyper-violence. Nicolas Winding Refn’s masterpiece blends arthouse aesthetic with classic Hollywood action perfectly...',
    author: 'Thompson P.',
    date: '15 June 2026',
    content: createContent(
      'Drive',
      'A silent driver, a killer soundtrack, and beautiful hyper-violence. Nicolas Winding Refn’s masterpiece blends arthouse aesthetic with classic Hollywood action perfectly.',
      [
        {
          heading: '1. Silence Speaks Louder',
          paragraphs: [
            'Ryan Gosling’s Driver says almost nothing, yet every glance and gesture carries weight. Restraint becomes the film’s most powerful weapon.',
          ],
        },
        {
          heading: '2. Neon Noir Atmosphere',
          paragraphs: [
            'Pink and blue light, night drives, and a synth-heavy soundtrack create a Los Angeles that feels both glamorous and dangerous.',
          ],
        },
        {
          heading: '3. Signature Touches',
          paragraphs: ['Drive sticks in memory for clear reasons:'],
          bullets: [
            { label: 'Soundtrack:', text: 'Songs that define the emotional temperature of each scene.' },
            { label: 'Violence:', text: 'Sudden, stylish, and never without consequence.' },
            { label: 'Mood:', text: 'A cool exterior over a romantic, tragic core.' },
          ],
        },
      ],
    ),
  },
  {
    id: 5,
    slug: 'uncut-gems',
    image: uncutGemsPoster,
    tag: 'Thriller',
    title: 'Uncut Gems: An Anxiety-Inducing Masterclass in Suspense',
    description:
      "Adam Sandler delivers a career-defining performance in this chaotic, high-stakes thriller. It's a relentless 2-hour panic attack that you simply cannot look away from...",
    author: 'Thompson P.',
    date: '12 June 2026',
    content: createContent(
      'Uncut Gems',
      "Adam Sandler delivers a career-defining performance in this chaotic, high-stakes thriller. It's a relentless 2-hour panic attack that you simply cannot look away from.",
      [
        {
          heading: '1. Chaos as Craft',
          paragraphs: [
            'The Safdie brothers stage New York jewelry-district pressure with overlapping dialogue and restless camera work. Anxiety becomes the film’s language.',
          ],
        },
        {
          heading: '2. Sandler Transformed',
          paragraphs: [
            'Howard Ratner is charming, desperate, and exhausting. Sandler makes every bad decision feel inevitable and somehow magnetic.',
          ],
        },
        {
          heading: '3. What Hits Hardest',
          paragraphs: ['The film’s impact comes from:'],
          bullets: [
            { label: 'Sound:', text: 'A score that keeps your pulse elevated.' },
            { label: 'Stakes:', text: 'Every gamble feels one breath from collapse.' },
            { label: 'Finale:', text: 'A payoff as shocking as it is earned.' },
          ],
        },
      ],
    ),
  },
  {
    id: 6,
    slug: 'nope',
    image: nopePoster,
    tag: 'Horror',
    title: 'Nope: Jordan Peele’s Spectacular Sci-Fi Horror Spectacle',
    description:
      "What lies above the clouds? Peele reimagines the classic UFO movie into a chilling critique of spectacle culture, exploitation, and humanity's obsession with capturing the unseen...",
    author: 'Thompson P.',
    date: '10 June 2026',
    content: createContent(
      'Nope',
      "What lies above the clouds? Peele reimagines the classic UFO movie into a chilling critique of spectacle culture, exploitation, and humanity's obsession with capturing the unseen.",
      [
        {
          heading: '1. Horror as Spectacle',
          paragraphs: [
            'Nope asks what we are willing to risk for the perfect shot. The terror is not only in the sky, but in our hunger to watch.',
          ],
        },
        {
          heading: '2. Western Meets Sci-Fi',
          paragraphs: [
            'Horse ranches, open skies, and UFO mystery collide into something original. The film feels both classic and newly invented.',
          ],
        },
        {
          heading: '3. Key Ideas',
          paragraphs: ['Peele leaves you thinking about:'],
          bullets: [
            { label: 'Spectacle:', text: 'When looking becomes dangerous.' },
            { label: 'Family:', text: 'Legacy, labor, and survival on the ranch.' },
            { label: 'Mystery:', text: 'Not every answer is meant to be filmed.' },
          ],
        },
      ],
    ),
  },
  {
    id: 7,
    slug: 'us',
    image: usPoster,
    tag: 'Horror',
    title: 'Us: A Terrifying and Thought-Provoking Doppelgänger Nightmare',
    description:
      'We are our own worst enemy. Jordan Peele delivers a stunningly creepy, metaphorical look at societal division through the lens of terrifying underground doppelgängers...',
    author: 'Thompson P.',
    date: '08 June 2026',
    content: createContent(
      'Us',
      'We are our own worst enemy. Jordan Peele delivers a stunningly creepy, metaphorical look at societal division through the lens of terrifying underground doppelgängers.',
      [
        {
          heading: '1. Home Invasion, Reinvented',
          paragraphs: [
            'The dread begins with a family vacation and escalates into a national nightmare. Familiar spaces become hostile the moment mirrors turn real.',
          ],
        },
        {
          heading: '2. Lupita Nyong’o’s Dual Performance',
          paragraphs: [
            'Playing both Adelaide and Red, Nyong’o carries the film’s emotional and physical terror with precision and power.',
          ],
        },
        {
          heading: '3. Layers Beneath the Scares',
          paragraphs: ['Beyond jump scares, Us explores:'],
          bullets: [
            { label: 'Class:', text: 'Who thrives above, and who is left below.' },
            { label: 'Identity:', text: 'What happens when the self has a shadow.' },
            { label: 'America:', text: 'A country confronting its own reflection.' },
          ],
        },
      ],
    ),
  },
  {
    id: 8,
    slug: 'past-lives',
    image: pastLivesPoster,
    tag: 'Romance',
    title: 'Past Lives: A Tender Meditation on Fate, Memory, and What Might Have Been',
    description:
      'Celine Song crafts a quietly devastating reunion story. Two childhood friends meet again in New York and wrestle with destiny, identity, and the lives they chose...',
    author: 'Thompson P.',
    date: '07 June 2026',
    content: createContent(
      'Past Lives',
      'Celine Song crafts a quietly devastating reunion story. Two childhood friends meet again in New York and wrestle with destiny, identity, and the lives they chose.',
      [
        {
          heading: '1. Quiet Emotion, Huge Impact',
          paragraphs: [
            'Past Lives rarely raises its voice. Instead, glances, pauses, and unfinished sentences carry years of longing.',
          ],
        },
        {
          heading: '2. Immigrant Identity and Choice',
          paragraphs: [
            'Nora’s journey between Seoul and New York shapes every relationship. The film treats immigration as both opportunity and irreversible distance.',
          ],
        },
        {
          heading: '3. Why It Feels So Honest',
          paragraphs: ['The film resonates because of:'],
          bullets: [
            { label: 'Chemistry:', text: 'A connection that feels lived-in, not forced.' },
            { label: 'Restraint:', text: 'No easy answers, only truthful ones.' },
            { label: 'Ending:', text: 'Bittersweet, adult, and unforgettable.' },
          ],
        },
      ],
    ),
  },
  {
    id: 9,
    slug: 'about-time',
    image: aboutTimePoster,
    tag: 'Romance',
    title: 'About Time: A Warm and Witty Celebration of Everyday Love',
    description:
      'Richard Curtis turns time travel into something deeply human. A young man learns that the greatest gift is not changing the past, but savoring each ordinary moment...',
    author: 'Thompson P.',
    date: '06 June 2026',
    content: createContent(
      'About Time',
      'Richard Curtis turns time travel into something deeply human. A young man learns that the greatest gift is not changing the past, but savoring each ordinary moment.',
      [
        {
          heading: '1. Fantasy With Warmth',
          paragraphs: [
            'Time travel here is not about saving the world. It is about learning how to live inside an ordinary, precious life.',
          ],
        },
        {
          heading: '2. Love in Small Moments',
          paragraphs: [
            'The romance works because it celebrates shared meals, awkward first meetings, and the comfort of choosing someone again and again.',
          ],
        },
        {
          heading: '3. Lessons That Stick',
          paragraphs: ['About Time leaves you with simple truths:'],
          bullets: [
            { label: 'Family:', text: 'A father-son bond that gives the film its soul.' },
            { label: 'Time:', text: 'You cannot keep every day, but you can notice it.' },
            { label: 'Joy:', text: 'Ordinary happiness is the real miracle.' },
          ],
        },
      ],
    ),
  },
  {
    id: 10,
    slug: 'lost-in-translation',
    image: lostInTranslationPoster,
    tag: 'Romance',
    title: 'Lost in Translation: A Melancholic and Beautiful Tokyo Connection',
    description:
      'Sofia Coppola captures loneliness with poetic precision. Two strangers adrift in Tokyo find comfort in each other through quiet conversations and unspoken longing...',
    author: 'Thompson P.',
    date: '05 June 2026',
    content: createContent(
      'Lost in Translation',
      'Sofia Coppola captures loneliness with poetic precision. Two strangers adrift in Tokyo find comfort in each other through quiet conversations and unspoken longing.',
      [
        {
          heading: '1. Loneliness in a Crowded City',
          paragraphs: [
            'Tokyo glows with neon and motion, yet Bob and Charlotte feel suspended between jet lag, hotels, and unfinished lives back home.',
          ],
        },
        {
          heading: '2. Connection Without Easy Labels',
          paragraphs: [
            'Their bond is intimate without needing a conventional romance arc. Coppola trusts the audience to feel what remains unsaid.',
          ],
        },
        {
          heading: '3. Lasting Impressions',
          paragraphs: ['The film endures through:'],
          bullets: [
            { label: 'Tone:', text: 'Melancholy wrapped in soft humor.' },
            { label: 'Performances:', text: 'Murray and Johansson in perfect sync.' },
            { label: 'Whisper:', text: 'An ending that protects its private meaning.' },
          ],
        },
      ],
    ),
  },
  {
    id: 11,
    slug: 'in-the-mood-for-love',
    image: inTheMoodForLovePoster,
    tag: 'Romance',
    title: 'In the Mood for Love: Wong Kar-wai’s Masterpiece of Restrained Desire',
    description:
      'Every frame aches with longing. Maggie Cheung and Tony Leung navigate betrayal and unspoken attraction in 1960s Hong Kong with heartbreaking elegance...',
    author: 'Thompson P.',
    date: '04 June 2026',
    content: createContent(
      'In the Mood for Love',
      'Every frame aches with longing. Maggie Cheung and Tony Leung navigate betrayal and unspoken attraction in 1960s Hong Kong with heartbreaking elegance.',
      [
        {
          heading: '1. Desire Held Back',
          paragraphs: [
            'Wong Kar-wai builds romance from almost-touches and shared routines. What never happens is as powerful as what does.',
          ],
        },
        {
          heading: '2. Visual Poetry',
          paragraphs: [
            'Corridors, rain, cigarette smoke, and cheongsams create a world where memory and longing blur together.',
          ],
        },
        {
          heading: '3. Unforgettable Details',
          paragraphs: ['The film lives in its smallest gestures:'],
          bullets: [
            { label: 'Music:', text: 'Recurring themes that deepen every reunion.' },
            { label: 'Color:', text: 'Reds and shadows that feel like secrets.' },
            { label: 'Silence:', text: 'Emotion spoken through what remains unsaid.' },
          ],
        },
      ],
    ),
  },
  {
    id: 12,
    slug: '2046',
    image: poster2046,
    tag: 'Romance',
    title: '2046: A Lush, Dreamlike Sequel to Unfinished Longing',
    description:
      'Wong Kar-wai returns to Chow Mo-wan in a sci-fi romance about memory and regret. A hypnotic blend of nostalgia, fantasy, and love that refuses to fade...',
    author: 'Thompson P.',
    date: '03 June 2026',
    content: createContent(
      '2046',
      'Wong Kar-wai returns to Chow Mo-wan in a sci-fi romance about memory and regret. A hypnotic blend of nostalgia, fantasy, and love that refuses to fade.',
      [
        {
          heading: '1. Memory as a Destination',
          paragraphs: [
            '2046 is less a place than a state of mind: a room where the past keeps replaying, and leaving feels impossible.',
          ],
        },
        {
          heading: '2. Romance Across Timelines',
          paragraphs: [
            'The film moves between Hong Kong apartments and futuristic trains, treating both as landscapes of unfinished love.',
          ],
        },
        {
          heading: '3. Why It Haunts',
          paragraphs: ['The dream logic works because of:'],
          bullets: [
            { label: 'Mood:', text: 'Lush, nocturnal, and endlessly circling.' },
            { label: 'Themes:', text: 'Regret, repetition, and emotional exile.' },
            { label: 'Connection:', text: 'Echoes of In the Mood for Love, transformed.' },
          ],
        },
      ],
    ),
  },
  {
    id: 13,
    slug: 'the-lobster',
    image: theLobsterPoster,
    tag: 'Comedy',
    title: 'The Lobster: A Deadpan Dystopian Satire on Modern Romance',
    description:
      'Yorgos Lanthimos delivers absurdity with a straight face. In a world where single people must find a partner or become animals, love becomes a cruel bureaucratic game...',
    author: 'Thompson P.',
    date: '02 June 2026',
    content: createContent(
      'The Lobster',
      'Yorgos Lanthimos delivers absurdity with a straight face. In a world where single people must find a partner or become animals, love becomes a cruel bureaucratic game.',
      [
        {
          heading: '1. Absurd Rules, Real Feelings',
          paragraphs: [
            'The premise is ridiculous on paper, yet the deadpan delivery makes social pressure around coupling feel uncomfortably familiar.',
          ],
        },
        {
          heading: '2. Romance Under Surveillance',
          paragraphs: [
            'Matchmaking becomes policy. Compatibility is measured, timed, and enforced until affection itself starts to look suspicious.',
          ],
        },
        {
          heading: '3. Satire That Stings',
          paragraphs: ['The comedy lands because it targets:'],
          bullets: [
            { label: 'Norms:', text: 'The fear of being single made literal.' },
            { label: 'Tone:', text: 'Flat delivery that sharpens every joke.' },
            { label: 'Ending:', text: 'Ambiguous and quietly devastating.' },
          ],
        },
      ],
    ),
  },
  {
    id: 14,
    slug: 'fargo',
    image: fargoPoster,
    tag: 'Comedy',
    title: 'Fargo: Dark Comedy Perfection in the Frozen Midwest',
    description:
      'The Coen Brothers blend crime and dry humor into something unforgettable. A kidnapping scheme spirals into chaos beneath endless snow and deceptively polite manners...',
    author: 'Thompson P.',
    date: '01 June 2026',
    content: createContent(
      'Fargo',
      'The Coen Brothers blend crime and dry humor into something unforgettable. A kidnapping scheme spirals into chaos beneath endless snow and deceptively polite manners.',
      [
        {
          heading: '1. Crime Wrapped in Politeness',
          paragraphs: [
            'Midwestern manners collide with violence in a way only the Coens could invent. The contrast is funny until it suddenly is not.',
          ],
        },
        {
          heading: '2. Marge as Moral Center',
          paragraphs: [
            'Frances McDormand’s Marge Gunderson is calm, sharp, and deeply human. Her decency anchors the film’s snowy chaos.',
          ],
        },
        {
          heading: '3. Perfect Ingredients',
          paragraphs: ['Fargo remains a classic because of:'],
          bullets: [
            { label: 'Tone:', text: 'Dark comedy balanced with genuine warmth.' },
            { label: 'Setting:', text: 'Snow that hides both beauty and blood.' },
            { label: 'Script:', text: 'Every line feels specific and quotable.' },
          ],
        },
      ],
    ),
  },
  {
    id: 15,
    slug: 'trainspotting',
    image: trainspottingPoster,
    tag: 'Comedy',
    title: 'Trainspotting: A Frenetic, Irreverent Portrait of Youth and Addiction',
    description:
      'Danny Boyle’s cult classic pulses with energy and dark wit. A raw, stylish dive into Edinburgh’s underground scene that is as funny as it is harrowing...',
    author: 'Thompson P.',
    date: '31 May 2026',
    content: createContent(
      'Trainspotting',
      'Danny Boyle’s cult classic pulses with energy and dark wit. A raw, stylish dive into Edinburgh’s underground scene that is as funny as it is harrowing.',
      [
        {
          heading: '1. Energy on Overdrive',
          paragraphs: [
            'Jump cuts, narration, and a ferocious soundtrack make the film feel like a rush. Style mirrors the characters’ volatile lives.',
          ],
        },
        {
          heading: '2. Humor With Sharp Edges',
          paragraphs: [
            'The jokes are loud and irreverent, but the film never forgets the damage underneath. Laughter and horror share the same frame.',
          ],
        },
        {
          heading: '3. Cult Status Explained',
          paragraphs: ['Trainspotting endures through:'],
          bullets: [
            { label: 'Voice:', text: 'Renton’s narration that pulls you in immediately.' },
            { label: 'Music:', text: 'A soundtrack that became inseparable from the film.' },
            { label: 'Honesty:', text: 'No romanticizing, only vivid truth.' },
          ],
        },
      ],
    ),
  },
  {
    id: 16,
    slug: 'american-psycho',
    image: americanPsychoPoster,
    tag: 'Comedy',
    title: 'American Psycho: A Razor-Sharp Satire of 1980s Excess',
    description:
      'Christian Bale is chillingly hilarious as Patrick Bateman. Beneath the violence lies a biting critique of consumerism, status obsession, and hollow ambition...',
    author: 'Thompson P.',
    date: '30 May 2026',
    content: createContent(
      'American Psycho',
      'Christian Bale is chillingly hilarious as Patrick Bateman. Beneath the violence lies a biting critique of consumerism, status obsession, and hollow ambition.',
      [
        {
          heading: '1. Horror as Social Comedy',
          paragraphs: [
            'Business cards, restaurants, and skincare routines become weapons of status. The satire is so precise it often feels funnier than it is frightening.',
          ],
        },
        {
          heading: '2. Bateman’s Empty Empire',
          paragraphs: [
            'Bale plays vanity and emptiness with icy control. Patrick Bateman is a mask with nothing trustworthy underneath.',
          ],
        },
        {
          heading: '3. What the Film Skewers',
          paragraphs: ['American Psycho aims at:'],
          bullets: [
            { label: 'Consumerism:', text: 'Identity reduced to brands and appearances.' },
            { label: 'Masculinity:', text: 'Competition that erases empathy.' },
            { label: 'Ambiguity:', text: 'Reality itself starts to look unreliable.' },
          ],
        },
      ],
    ),
  },
];

export function getMovieById(id) {
  const numericId = Number(id);
  return moviesData.find((movie) => movie.id === numericId) || null;
}

export function getMovieBySlug(slug) {
  return moviesData.find((movie) => movie.slug === slug) || null;
}
