// Comprehensive AI-generated learning content for all languages, subjects, and levels
import { getAIGeneratedContent } from './aiContentApi'

const hindiAlphabets = [
  { target: 'अ', hint: 'First letter - अक्षर का पहला अक्षर (Akshar ka pehla akshar)' },
  { target: 'आ', hint: 'Second letter - आम का आ (Aam ka aa)' },
  { target: 'इ', hint: 'Third letter - इमली का इ (Imli ka i)' },
  { target: 'ई', hint: 'Fourth letter - ईख का ई (Eekh ka ee)' },
  { target: 'उ', hint: 'Fifth letter - उल्लू का उ (Ullu ka u)' },
  { target: 'ऊ', hint: 'Sixth letter - ऊंट का ऊ (Oont ka oo)' },
  { target: 'ए', hint: 'Seventh letter - एक का ए (Ek ka e)' },
  { target: 'ऐ', hint: 'Eighth letter - ऐनक का ऐ (Ainak ka ai)' },
  { target: 'ओ', hint: 'Ninth letter - ओखली का ओ (Okhli ka o)' },
  { target: 'औ', hint: 'Tenth letter - औरत का औ (Aurat ka au)' },
  { target: 'क', hint: 'कबूतर का क (Kabootar ka ka)' },
  { target: 'ख', hint: 'खरगोश का ख (Khargosh ka kha)' },
  { target: 'ग', hint: 'गाय का ग (Gay ka ga)' },
  { target: 'घ', hint: 'घर का घ (Ghar ka gha)' },
  { target: 'च', hint: 'चम्मच का च (Chammach ka cha)' },
  { target: 'छ', hint: 'छत का छ (Chat ka chha)' },
  { target: 'ज', hint: 'जहाज का ज (Jahaj ka ja)' },
  { target: 'झ', hint: 'झंडा का झ (Jhanda ka jha)' },
  { target: 'ट', hint: 'टमाटर का ट (Tamatar ka ta)' },
  { target: 'ठ', hint: 'ठेला का ठ (Thela ka tha)' },
  { target: 'ड', hint: 'डब्बा का ड (Dabba ka da)' },
  { target: 'ढ', hint: 'ढोल का ढ (Dhol ka dha)' },
  { target: 'त', hint: 'तरबूज का त (Tarbuj ka ta)' },
  { target: 'थ', hint: 'थैली का थ (Thaili ka tha)' },
  { target: 'द', hint: 'दरवाजा का द (Darwaja ka da)' },
  { target: 'ध', hint: 'धनुष का ध (Dhanush ka dha)' },
  { target: 'न', hint: 'नाक का न (Naak ka na)' },
  { target: 'प', hint: 'पानी का प (Pani ka pa)' },
  { target: 'फ', hint: 'फूल का फ (Phool ka pha)' },
  { target: 'ब', hint: 'बादल का ब (Badal ka ba)' },
  { target: 'भ', hint: 'भालू का भ (Bhalu ka bha)' },
  { target: 'म', hint: 'मछली का म (Machli ka ma)' },
  { target: 'य', hint: 'यात्रा का य (Yatra ka ya)' },
  { target: 'र', hint: 'रोटी का र (Roti ka ra)' },
  { target: 'ल', hint: 'लाल का ल (Lal ka la)' },
  { target: 'व', hint: 'वन का व (Van ka va)' },
  { target: 'श', hint: 'शेर का श (Sher ka sha)' },
  { target: 'ष', hint: 'षट्कोण का ष (Shatkon ka sha)' },
  { target: 'स', hint: 'सूरज का स (Suraj ka sa)' },
  { target: 'ह', hint: 'हाथी का ह (Hathi ka ha)' }
]

const hindiWords = [
  { target: 'अम', hint: 'Mango - एक मीठा फल (Ek meeta phal)' },
  { target: 'आम', hint: 'Common - सामान्य (Samanay)' },
  { target: 'इनाम', hint: 'Reward - पुरस्कार (Puraskar)' },
  { target: 'उमंग', hint: 'Enthusiasm - उत्साह (Utsah)' },
  { target: 'एक', hint: 'One - संख्या एक (Sankhya ek)' },
  { target: 'ओर', hint: 'Other - दूसरा (Dusra)' },
  { target: 'और', hint: 'And - तथा (Tatha)' },
  { target: 'कमल', hint: 'Lotus - कमल का फूल (Kamal ka phool)' },
  { target: 'खाना', hint: 'Food - भोजन (Bhojan)' },
  { target: 'गाय', hint: 'Cow - गाय एक जानवर है (Gay ek janvar hai)' },
  { target: 'घर', hint: 'Home - घर जहां हम रहते हैं (Ghar jahan hum rahte hain)' },
  { target: 'चाय', hint: 'Tea - गर्म पेय (Garm pey)' },
  { target: 'छत', hint: 'Roof - मकान का ऊपरी भाग (Makan ka upari bhag)' },
  { target: 'जहाज', hint: 'Ship - पानी का जहाज (Pani ka jahaj)' },
  { target: 'झंडा', hint: 'Flag - तिरंगा झंडा (Tiranga jhanda)' },
  { target: 'टमाटर', hint: 'Tomato - लाल सब्जी (Lal sabzi)' },
  { target: 'तरबूज', hint: 'Watermelon - बड़ा फल (Bada phal)' },
  { target: 'दरवाजा', hint: 'Door - घर का प्रवेश (Ghar ka pravesh)' },
  { target: 'नाक', hint: 'Nose - सूंघने का अंग (Soonghne ka ang)' },
  { target: 'पानी', hint: 'Water - जीवन का आधार (Jeevan ka aadhar)' },
  { target: 'फूल', hint: 'Flower - सुंदर पौधा (Sundar paudha)' },
  { target: 'बादल', hint: 'Cloud - आसमान में बादल (Aasman mein badal)' },
  { target: 'भालू', hint: 'Bear - जंगली जानवर (Jangli janvar)' },
  { target: 'मछली', hint: 'Fish - पानी में रहने वाला जीव (Pani mein rahne wala jeev)' },
  { target: 'रोटी', hint: 'Bread - खाने की रोटी (Khane ki roti)' },
  { target: 'लाल', hint: 'Red - लाल रंग (Lal rang)' },
  { target: 'शेर', hint: 'Lion - जंगल का राजा (Jangal ka raja)' },
  { target: 'सूरज', hint: 'Sun - दिन का प्रकाश (Din ka prakash)' },
  { target: 'हाथी', hint: 'Elephant - बड़ा जानवर (Bada janvar)' }
]

const hindiSentences = [
  { target: 'अम खाओ', hint: 'Eat mango - मीठा फल खाओ (Meeta phal khao)' },
  { target: 'एक आम', hint: 'One mango - एक फल (Ek phal)' },
  { target: 'मैं पढ़ता हूं', hint: 'I study - मैं सीखता हूं (Main seekhta hoon)' },
  { target: 'पानी पीओ', hint: 'Drink water - स्वस्थ रहने के लिए (Swasth rahne ke liye)' },
  { target: 'रोटी खाओ', hint: 'Eat bread - भोजन करो (Bhojan karo)' },
  { target: 'मैं खुश हूं', hint: 'I am happy - मैं प्रसन्न हूं (Main prasann hoon)' },
  { target: 'यह अच्छा है', hint: 'This is good - यह बहुत अच्छा है (Yeh bahut achha hai)' },
  { target: 'मैं तुमसे प्यार करता हूं', hint: 'I love you - प्यार का भाव (Pyar ka bhav)' },
  { target: 'आज मौसम अच्छा है', hint: 'Today weather is good - सुंदर दिन (Sundar din)' },
  { target: 'मैं स्कूल जाता हूं', hint: 'I go to school - शिक्षा के लिए (Shiksha ke liye)' }
]

const englishAlphabets = [
  { target: 'A', hint: 'First letter - Apple starts with A' },
  { target: 'B', hint: 'Second letter - Ball starts with B' },
  { target: 'C', hint: 'Third letter - Cat starts with C' },
  { target: 'D', hint: 'Fourth letter - Dog starts with D' },
  { target: 'E', hint: 'Fifth letter - Elephant starts with E' },
  { target: 'F', hint: 'Sixth letter - Fish starts with F' },
  { target: 'G', hint: 'Seventh letter - Goat starts with G' },
  { target: 'H', hint: 'Eighth letter - Hat starts with H' },
  { target: 'I', hint: 'Ninth letter - Ice starts with I' },
  { target: 'J', hint: 'Tenth letter - Jam starts with J' },
  { target: 'K', hint: 'Kite starts with K' },
  { target: 'L', hint: 'Lion starts with L' },
  { target: 'M', hint: 'Moon starts with M' },
  { target: 'N', hint: 'Nest starts with N' },
  { target: 'O', hint: 'Orange starts with O' },
  { target: 'P', hint: 'Pencil starts with P' },
  { target: 'Q', hint: 'Queen starts with Q' },
  { target: 'R', hint: 'Rabbit starts with R' },
  { target: 'S', hint: 'Sun starts with S' },
  { target: 'T', hint: 'Tree starts with T' },
  { target: 'U', hint: 'Umbrella starts with U' },
  { target: 'V', hint: 'Violin starts with V' },
  { target: 'W', hint: 'Water starts with W' },
  { target: 'X', hint: 'X-ray starts with X' },
  { target: 'Y', hint: 'Yellow starts with Y' },
  { target: 'Z', hint: 'Zebra starts with Z' }
]

const englishWords = [
  { target: 'CAT', hint: 'A furry animal that meows - प्यारा जानवर (Pyara janvar)' },
  { target: 'DOG', hint: 'A friendly pet - वफादार दोस्त (Wafadar dost)' },
  { target: 'BALL', hint: 'Round toy - गोल खिलौना (Gol khilona)' },
  { target: 'HAT', hint: 'Wear on head - सिर पर पहनें (Sir par pehen)' },
  { target: 'SUN', hint: 'Shines in the sky - आसमान में चमकता है (Aasman mein chamakta hai)' },
  { target: 'MOON', hint: 'Shines at night - रात में चमकता है (Raat mein chamakta hai)' },
  { target: 'STAR', hint: 'Twinkles in sky - आसमान में टिमटिमाता है (Aasman mein timtimata hai)' },
  { target: 'TREE', hint: 'Tall plant - ऊंचा पौधा (Uncha paudha)' },
  { target: 'BOOK', hint: 'Read stories - कहानियां पढ़ें (Kahaniyan padhen)' },
  { target: 'CUP', hint: 'Drink from it - पीने के लिए (Peene ke liye)' },
  { target: 'CAKE', hint: 'Sweet treat - मीठा व्यंजन (Meeta vyajan)' },
  { target: 'FISH', hint: 'Lives in water - पानी में रहता है (Pani mein rahta hai)' },
  { target: 'BIRD', hint: 'Flies in sky - आसमान में उड़ता है (Aasman mein udta hai)' },
  { target: 'HOME', hint: 'Where we live - जहां हम रहते हैं (Jahan hum rahte hain)' },
  { target: 'LOVE', hint: 'Caring feeling - प्यार की भावना (Pyar ki bhavna)' },
  { target: 'HAPPY', hint: 'Feeling good - खुशी की भावना (Khushi ki bhavna)' },
  { target: 'SMILE', hint: 'Happy face - खुशी का चेहरा (Khushi ka chehra)' },
  { target: 'WATER', hint: 'Drink it - पीने के लिए पानी (Peene ke liye pani)' },
  { target: 'MILK', hint: 'White drink - सफेद पेय (Safed pey)' },
  { target: 'BREAD', hint: 'Food item - खाने की चीज (Khane ki cheez)' }
]

const englishSentences = [
  { target: 'I AM HAPPY', hint: 'Express joy - मैं खुश हूं (Main khush hoon)' },
  { target: 'THE CAT SAT', hint: 'Simple sentence - बिल्ली बैठी (Billi baithi)' },
  { target: 'I LOVE YOU', hint: 'Express love - मैं तुमसे प्यार करता हूं (Main tumse pyar karta hoon)' },
  { target: 'SUN IS HOT', hint: 'Weather fact - सूरज गर्म है (Suraj garm hai)' },
  { target: 'I SEE A STAR', hint: 'Observation - मैं एक तारा देखता हूं (Main ek tara dekhta hoon)' },
  { target: 'THE DOG RUNS', hint: 'Action - कुत्ता दौड़ता है (Kutta daudta hai)' },
  { target: 'I EAT FOOD', hint: 'Daily activity - मैं खाना खाता हूं (Main khana khata hoon)' },
  { target: 'WATER IS GOOD', hint: 'Health tip - पानी अच्छा है (Pani achha hai)' },
  { target: 'I READ BOOKS', hint: 'Learning - मैं किताबें पढ़ता हूं (Main kitaben padhta hoon)' },
  { target: 'TODAY IS NICE', hint: 'Weather - आज का दिन अच्छा है (Aaj ka din achha hai)' }
]

const marwadiAlphabets = [
  { target: 'अ', hint: 'First letter - अक्षर का पहला अक्षर (Akshar ka pehla akshar)' },
  { target: 'आ', hint: 'Second letter - आम का आ (Aam ka aa)' },
  { target: 'इ', hint: 'Third letter - इमली का इ (Imli ka i)' },
  { target: 'ई', hint: 'Fourth letter - ईख का ई (Eekh ka ee)' },
  { target: 'उ', hint: 'Fifth letter - उल्लू का उ (Ullu ka u)' },
  { target: 'ऊ', hint: 'Sixth letter - ऊंट का ऊ (Oont ka oo)' },
  { target: 'ए', hint: 'Seventh letter - एक का ए (Ek ka e)' },
  { target: 'ऐ', hint: 'Eighth letter - ऐनक का ऐ (Ainak ka ai)' },
  { target: 'ओ', hint: 'Ninth letter - ओखली का ओ (Okhli ka o)' },
  { target: 'औ', hint: 'Tenth letter - औरत का औ (Aurat ka au)' },
  { target: 'क', hint: 'कबूतर का क (Kabootar ka ka)' },
  { target: 'ख', hint: 'खरगोश का ख (Khargosh ka kha)' },
  { target: 'ग', hint: 'गाय का ग (Gay ka ga)' },
  { target: 'च', hint: 'चम्मच का च (Chammach ka cha)' },
  { target: 'ज', hint: 'जहाज का ज (Jahaj ka ja)' },
  { target: 'ट', hint: 'टमाटर का ट (Tamatar ka ta)' },
  { target: 'त', hint: 'तरबूज का त (Tarbuj ka ta)' },
  { target: 'द', hint: 'दरवाजा का द (Darwaja ka da)' },
  { target: 'न', hint: 'नाक का न (Naak ka na)' },
  { target: 'प', hint: 'पानी का प (Pani ka pa)' },
  { target: 'ब', hint: 'बादल का ब (Badal ka ba)' },
  { target: 'म', hint: 'मछली का म (Machli ka ma)' },
  { target: 'य', hint: 'यात्रा का य (Yatra ka ya)' },
  { target: 'र', hint: 'रोटी का र (Roti ka ra)' },
  { target: 'ल', hint: 'लाल का ल (Lal ka la)' },
  { target: 'व', hint: 'वन का व (Van ka va)' },
  { target: 'श', hint: 'शेर का श (Sher ka sha)' },
  { target: 'स', hint: 'सूरज का स (Suraj ka sa)' },
  { target: 'ह', hint: 'हाथी का ह (Hathi ka ha)' }
]

const marwadiWords = [
  { target: 'राम', hint: 'A name - एक नाम (Ek naam)' },
  { target: 'काम', hint: 'Work - कार्य करना (Kary karna)' },
  { target: 'आम', hint: 'Mango - मीठा फल (Meeta phal)' },
  { target: 'पानी', hint: 'Water - जीवन का आधार (Jeevan ka aadhar)' },
  { target: 'रोटी', hint: 'Bread - खाने की रोटी (Khane ki roti)' },
  { target: 'घर', hint: 'Home - जहां हम रहते हैं (Jahan hum rahte hain)' },
  { target: 'बच्चा', hint: 'Child - छोटा बच्चा (Chota bachcha)' },
  { target: 'माँ', hint: 'Mother - माता (Mata)' },
  { target: 'पिता', hint: 'Father - पिताजी (Pitaji)' },
  { target: 'स्कूल', hint: 'School - विद्यालय (Vidyalay)' },
  { target: 'किताब', hint: 'Book - पढ़ने की किताब (Padhne ki kitab)' },
  { target: 'खेल', hint: 'Play - खेलना (Khelna)' },
  { target: 'खाना', hint: 'Food - भोजन (Bhojan)' },
  { target: 'सोना', hint: 'Sleep - नींद (Neend)' },
  { target: 'उठना', hint: 'Wake up - जागना (Jagna)' }
]

const marwadiSentences = [
  { target: 'कैसे हो?', hint: 'How are you? - आप कैसे हैं? (Aap kaise hain?)' },
  { target: 'मैं ठीक हूं', hint: 'I am fine - मैं अच्छा हूं (Main achha hoon)' },
  { target: 'तुम कहाँ हो?', hint: 'Where are you? - आप कहाँ हैं? (Aap kahan hain?)' },
  { target: 'मैं यहाँ हूं', hint: 'I am here - मैं यहाँ हूं (Main yahan hoon)' },
  { target: 'खाना खाओ', hint: 'Eat food - भोजन करो (Bhojan karo)' },
  { target: 'पानी पीओ', hint: 'Drink water - पानी पिएं (Pani piyein)' },
  { target: 'स्कूल जाओ', hint: 'Go to school - विद्यालय जाओ (Vidyalay jao)' },
  { target: 'मैं खुश हूं', hint: 'I am happy - मैं प्रसन्न हूं (Main prasann hoon)' },
  { target: 'तुम अच्छे हो', hint: 'You are good - आप अच्छे हैं (Aap achhe hain)' },
  { target: 'आज मौसम अच्छा है', hint: 'Today weather is good - सुंदर दिन (Sundar din)' }
]

const mathNumbers = [
  { target: '1', hint: 'One - पहला नंबर (Pehla number)' },
  { target: '2', hint: 'Two - दूसरा नंबर (Dusra number)' },
  { target: '3', hint: 'Three - तीसरा नंबर (Teesra number)' },
  { target: '4', hint: 'Four - चौथा नंबर (Chautha number)' },
  { target: '5', hint: 'Five - पांचवां नंबर (Panchvan number)' },
  { target: '6', hint: 'Six - छठा नंबर (Chhatha number)' },
  { target: '7', hint: 'Seven - सातवां नंबर (Satvan number)' },
  { target: '8', hint: 'Eight - आठवां नंबर (Aathvan number)' },
  { target: '9', hint: 'Nine - नौवां नंबर (Nauvan number)' },
  { target: '10', hint: 'Ten - दसवां नंबर (Dasvan number)' },
  { target: '11', hint: 'Eleven - ग्यारह (Gyarah)' },
  { target: '12', hint: 'Twelve - बारह (Barah)' },
  { target: '13', hint: 'Thirteen - तेरह (Terah)' },
  { target: '14', hint: 'Fourteen - चौदह (Chaudah)' },
  { target: '15', hint: 'Fifteen - पंद्रह (Pandrah)' },
  { target: '16', hint: 'Sixteen - सोलह (Solah)' },
  { target: '17', hint: 'Seventeen - सत्रह (Satrah)' },
  { target: '18', hint: 'Eighteen - अठारह (Aatharah)' },
  { target: '19', hint: 'Nineteen - उन्नीस (Unnis)' },
  { target: '20', hint: 'Twenty - बीस (Bees)' },
  { target: '25', hint: 'Twenty Five - पच्चीस (Pachchees)' },
  { target: '30', hint: 'Thirty - तीस (Teess)' },
  { target: '50', hint: 'Fifty - पचास (Pachas)' },
  { target: '100', hint: 'Hundred - सौ (Sau)' }
]

const mathShapes = [
  { target: '○', hint: 'Circle - Round shape like a ball - गोल आकार (Gol aakar)' },
  { target: '□', hint: 'Square - Four equal sides - चौकोर आकार (Chaukor aakar)' },
  { target: '△', hint: 'Triangle - Three sides - तीन कोनों वाला (Teen konon wala)' },
  { target: '◇', hint: 'Diamond - Four sides like a kite - हीरे जैसा (Hire jaisa)' },
  { target: '★', hint: 'Star - Five points - पांच कोनों वाला (Panch konon wala)' },
  { target: '♥', hint: 'Heart - Love shape - दिल का आकार (Dil ka aakar)' },
  { target: '⬟', hint: 'Pentagon - Five sides - पांच भुजाएं (Panch bhujayen)' },
  { target: '⬡', hint: 'Hexagon - Six sides - छह भुजाएं (Chhah bhujayen)' },
  { target: '⬢', hint: 'Octagon - Eight sides - आठ भुजाएं (Aath bhujayen)' },
  { target: '☐', hint: 'Rectangle - Long square - लंबा चौकोर (Lamba chaukor)' }
]

const mathPahade = [
  { target: '2 × 1 = 2', hint: 'Two times one equals two - दो गुना एक बराबर दो (Do guna ek barabar do)' },
  { target: '2 × 2 = 4', hint: 'Two times two equals four - दो गुना दो बराबर चार (Do guna do barabar char)' },
  { target: '2 × 3 = 6', hint: 'Two times three equals six - दो गुना तीन बराबर छह (Do guna teen barabar chhah)' },
  { target: '2 × 4 = 8', hint: 'Two times four equals eight - दो गुना चार बराबर आठ (Do guna char barabar aath)' },
  { target: '2 × 5 = 10', hint: 'Two times five equals ten - दो गुना पांच बराबर दस (Do guna panch barabar das)' },
  { target: '3 × 1 = 3', hint: 'Three times one equals three - तीन गुना एक बराबर तीन (Teen guna ek barabar teen)' },
  { target: '3 × 2 = 6', hint: 'Three times two equals six - तीन गुना दो बराबर छह (Teen guna do barabar chhah)' },
  { target: '3 × 3 = 9', hint: 'Three times three equals nine - तीन गुना तीन बराबर नौ (Teen guna teen barabar nau)' },
  { target: '3 × 4 = 12', hint: 'Three times four equals twelve - तीन गुना चार बराबर बारह (Teen guna char barabar barah)' },
  { target: '3 × 5 = 15', hint: 'Three times five equals fifteen - तीन गुना पांच बराबर पंद्रह (Teen guna panch barabar pandrah)' },
  { target: '4 × 1 = 4', hint: 'Four times one equals four - चार गुना एक बराबर चार (Char guna ek barabar char)' },
  { target: '4 × 2 = 8', hint: 'Four times two equals eight - चार गुना दो बराबर आठ (Char guna do barabar aath)' },
  { target: '4 × 3 = 12', hint: 'Four times three equals twelve - चार गुना तीन बराबर बारह (Char guna teen barabar barah)' },
  { target: '4 × 4 = 16', hint: 'Four times four equals sixteen - चार गुना चार बराबर सोलह (Char guna char barabar solah)' },
  { target: '4 × 5 = 20', hint: 'Four times five equals twenty - चार गुना पांच बराबर बीस (Char guna panch barabar bees)' },
  { target: '5 × 1 = 5', hint: 'Five times one equals five - पांच गुना एक बराबर पांच (Panch guna ek barabar panch)' },
  { target: '5 × 2 = 10', hint: 'Five times two equals ten - पांच गुना दो बराबर दस (Panch guna do barabar das)' },
  { target: '5 × 3 = 15', hint: 'Five times three equals fifteen - पांच गुना तीन बराबर पंद्रह (Panch guna teen barabar pandrah)' },
  { target: '5 × 4 = 20', hint: 'Five times four equals twenty - पांच गुना चार बराबर बीस (Panch guna char barabar bees)' },
  { target: '5 × 5 = 25', hint: 'Five times five equals twenty-five - पांच गुना पांच बराबर पच्चीस (Panch guna panch barabar pachchees)' },
  { target: '6 × 1 = 6', hint: 'Six times one equals six - छह गुना एक बराबर छह (Chhah guna ek barabar chhah)' },
  { target: '6 × 2 = 12', hint: 'Six times two equals twelve - छह गुना दो बराबर बारह (Chhah guna do barabar barah)' },
  { target: '6 × 3 = 18', hint: 'Six times three equals eighteen - छह गुना तीन बराबर अठारह (Chhah guna teen barabar aatharah)' },
  { target: '6 × 4 = 24', hint: 'Six times four equals twenty-four - छह गुना चार बराबर चौबीस (Chhah guna char barabar chaubees)' },
  { target: '6 × 5 = 30', hint: 'Six times five equals thirty - छह गुना पांच बराबर तीस (Chhah guna panch barabar teess)' },
  { target: '7 × 1 = 7', hint: 'Seven times one equals seven - सात गुना एक बराबर सात (Sat guna ek barabar sat)' },
  { target: '7 × 2 = 14', hint: 'Seven times two equals fourteen - सात गुना दो बराबर चौदह (Sat guna do barabar chaudah)' },
  { target: '7 × 3 = 21', hint: 'Seven times three equals twenty-one - सात गुना तीन बराबर इक्कीस (Sat guna teen barabar ikkis)' },
  { target: '7 × 4 = 28', hint: 'Seven times four equals twenty-eight - सात गुना चार बराबर अट्ठाईस (Sat guna char barabar athhais)' },
  { target: '7 × 5 = 35', hint: 'Seven times five equals thirty-five - सात गुना पांच बराबर पैंतीस (Sat guna panch barabar paintis)' },
  { target: '8 × 1 = 8', hint: 'Eight times one equals eight - आठ गुना एक बराबर आठ (Aath guna ek barabar aath)' },
  { target: '8 × 2 = 16', hint: 'Eight times two equals sixteen - आठ गुना दो बराबर सोलह (Aath guna do barabar solah)' },
  { target: '8 × 3 = 24', hint: 'Eight times three equals twenty-four - आठ गुना तीन बराबर चौबीस (Aath guna teen barabar chaubees)' },
  { target: '8 × 4 = 32', hint: 'Eight times four equals thirty-two - आठ गुना चार बराबर बत्तीस (Aath guna char barabar battis)' },
  { target: '8 × 5 = 40', hint: 'Eight times five equals forty - आठ गुना पांच बराबर चालीस (Aath guna panch barabar chalis)' },
  { target: '9 × 1 = 9', hint: 'Nine times one equals nine - नौ गुना एक बराबर नौ (Nau guna ek barabar nau)' },
  { target: '9 × 2 = 18', hint: 'Nine times two equals eighteen - नौ गुना दो बराबर अठारह (Nau guna do barabar aatharah)' },
  { target: '9 × 3 = 27', hint: 'Nine times three equals twenty-seven - नौ गुना तीन बराबर सत्ताईस (Nau guna teen barabar sattais)' },
  { target: '9 × 4 = 36', hint: 'Nine times four equals thirty-six - नौ गुना चार बराबर छत्तीस (Nau guna char barabar chhattis)' },
  { target: '9 × 5 = 45', hint: 'Nine times five equals forty-five - नौ गुना पांच बराबर पैंतालीस (Nau guna panch barabar paintalis)' },
  { target: '10 × 1 = 10', hint: 'Ten times one equals ten - दस गुना एक बराबर दस (Das guna ek barabar das)' },
  { target: '10 × 2 = 20', hint: 'Ten times two equals twenty - दस गुना दो बराबर बीस (Das guna do barabar bees)' },
  { target: '10 × 3 = 30', hint: 'Ten times three equals thirty - दस गुना तीन बराबर तीस (Das guna teen barabar teess)' },
  { target: '10 × 4 = 40', hint: 'Ten times four equals forty - दस गुना चार बराबर चालीस (Das guna char barabar chalis)' },
  { target: '10 × 5 = 50', hint: 'Ten times five equals fifty - दस गुना पांच बराबर पचास (Das guna panch barabar pachas)' }
]

// AI-generated comprehensive learning content with API integration
// Fallback content (used if API fails or for initial load)
const getFallbackContent = (language, subject, level) => {
  const contentMap = {
    hindi: {
      hindi: {
        alphabets: hindiAlphabets,
        words: hindiWords,
        sentences: hindiSentences
      },
      math: {
        numbers: mathNumbers,
        shapes: mathShapes,
        pahade: mathPahade
      }
    },
    english: {
      english: {
        alphabets: englishAlphabets,
        words: englishWords,
        sentences: englishSentences
      },
      math: {
        numbers: mathNumbers,
        shapes: mathShapes,
        pahade: mathPahade
      }
    },
    marwadi: {
      marwadi: {
        alphabets: marwadiAlphabets,
        words: marwadiWords,
        sentences: marwadiSentences
      }
    }
  }
  return contentMap[language]?.[subject]?.[level] || []
}

// Main function - now async to support AI API
export const getLearningContent = async (language, subject, level) => {
  try {
    // Try to get AI-generated content first
    const aiContent = await getAIGeneratedContent(language, subject, level)
    if (aiContent && aiContent.length > 0) {
      return aiContent
    }
  } catch (error) {
    // Silently fallback to local content if AI fails
  }

  // Fallback to local content
  const fallbackContent = getFallbackContent(language, subject, level)
  return fallbackContent
}

// Synchronous version for backwards compatibility (returns fallback immediately)
export const getLearningContentSync = (language, subject, level) => {
  return getFallbackContent(language, subject, level)
}

// AI-generated voice scripts for guidance
export const getVoiceScripts = (language) => {
  const scripts = {
    hindi: {
      welcome: 'नमस्ते! आज हम कुछ नया सीखेंगे।',
      correct: 'बहुत अच्छा! शाबाश!',
      incorrect: 'यह गलत है, फिर से कोशिश करो।',
      hint: 'मैं तुम्हें एक संकेत देता हूं...',
      complete: 'बहुत बढ़िया! तुमने यह स्तर पूरा कर लिया!',
      encouragement: 'तुम बहुत अच्छे हो! लगे रहो!'
    },
    english: {
      welcome: 'Hello! Let\'s learn something new today!',
      correct: 'Excellent! Well done!',
      incorrect: 'Not quite right, try again!',
      hint: 'Let me give you a hint...',
      complete: 'Wonderful! You completed this level!',
      encouragement: 'You are doing great! Keep going!'
    },
    marwadi: {
      welcome: 'राम राम! आज हम कुछ नया सीखेंगे।',
      correct: 'बहुत सारो! शाबाश!',
      incorrect: 'यो गलत है, फिर से कोशिश करो।',
      hint: 'मैं तुम्हें एक संकेत देता हूं...',
      complete: 'बहुत बढ़िया! तुमने यह स्तर पूरा कर लिया!',
      encouragement: 'तुम बहुत अच्छे हो! लगे रहो!'
    }
  }

  return scripts[language] || scripts.english
}

// AI-generated learning tips
export const getLearningTips = (language, subject, level) => {
  const tips = {
    hindi: {
      alphabets: 'धीरे-धीरे लिखें, हर अक्षर को सही तरीके से बनाएं।',
      words: 'शब्दों को ध्यान से लिखें और बोलें।',
      sentences: 'वाक्य बनाते समय सभी शब्दों को सही क्रम में रखें।'
    },
    english: {
      alphabets: 'Write slowly, form each letter correctly.',
      words: 'Write and pronounce words carefully.',
      sentences: 'Arrange all words in correct order when making sentences.'
    },
    marwadi: {
      alphabets: 'धीरे-धीरे लिखें, हर अक्षर को सही तरीके से बनाएं।',
      words: 'शब्दों को ध्यान से लिखें और बोलें।',
      sentences: 'वाक्य बनाते समय सभी शब्दों को सही क्रम में रखें।'
    }
  }

  return tips[language]?.[level] || 'Practice makes perfect!'
}