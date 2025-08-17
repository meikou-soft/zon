export interface Story {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  category: 'school' | 'sea' | 'mountain' | 'obon' | 'urban';
  scenes: Scene[];
}

export interface Scene {
  id: string;
  background?: string;
  bgm?: string;
  text: string;
  character?: string;
  effects?: Effect[];
  choices?: Choice[];
  nextScene?: string;
}

export interface Choice {
  text: string;
  nextScene: string;
  consequence?: string;
}

export interface Effect {
  type: 'shake' | 'flash' | 'fade' | 'sound';
  duration?: number;
  sound?: string;
}

export const stories: Story[] = [
  {
    id: 'hanako',
    title: 'トイレの花子さん',
    subtitle: '学校の七不思議',
    description: '3階の女子トイレには、花子さんという少女の霊が住んでいるという...',
    thumbnail: '/static/images/hanako_thumb.jpg',
    category: 'school',
    scenes: [
      {
        id: 'start',
        background: '/static/images/school_hallway.jpg',
        bgm: '/static/audio/bgm_suspense.mp3',
        text: '放課後の校舎。薄暗い廊下を歩いていると、友達の美香が言った。',
        nextScene: 'scene1'
      },
      {
        id: 'scene1',
        text: '「ねえ、知ってる？3階の女子トイレに花子さんって幽霊がいるんだって」',
        character: '美香',
        nextScene: 'scene2'
      },
      {
        id: 'scene2',
        text: '美香の話によると、3階の女子トイレの3番目の個室をノックして「花子さん、遊びましょ」と3回言うと返事が返ってくるらしい。',
        choices: [
          {
            text: '試してみる',
            nextScene: 'try_it'
          },
          {
            text: '怖いからやめる',
            nextScene: 'refuse'
          }
        ]
      },
      {
        id: 'try_it',
        background: '/static/images/toilet.jpg',
        text: '好奇心に負けて、私たちは3階の女子トイレへ向かった。',
        effects: [{ type: 'fade', duration: 1000 }],
        nextScene: 'knock'
      },
      {
        id: 'knock',
        text: '薄暗いトイレの前で、私は深呼吸をした。そして、3番目の個室のドアを3回ノックする。',
        effects: [{ type: 'sound', sound: '/static/audio/knock.mp3' }],
        nextScene: 'call'
      },
      {
        id: 'call',
        text: '「花子さん...花子さん...遊びましょ...」',
        nextScene: 'response'
      },
      {
        id: 'response',
        text: 'しばらく沈黙が続いた。そして...',
        effects: [{ type: 'sound', sound: '/static/audio/creak.mp3' }],
        nextScene: 'voice'
      },
      {
        id: 'voice',
        text: '「...はーい」',
        character: '？？？',
        effects: [
          { type: 'shake', duration: 500 },
          { type: 'sound', sound: '/static/audio/ghost_voice.mp3' }
        ],
        nextScene: 'door_open'
      },
      {
        id: 'door_open',
        text: 'ゆっくりと、個室のドアが開き始めた。そこには赤いスカートを履いた少女が立っていた。',
        background: '/static/images/hanako.jpg',
        effects: [{ type: 'flash', duration: 200 }],
        nextScene: 'ending_bad'
      },
      {
        id: 'ending_bad',
        text: 'その後、私たちがどうなったかは...誰も知らない。',
        bgm: '/static/audio/bgm_horror.mp3',
        nextScene: null
      },
      {
        id: 'refuse',
        text: '「やっぱり怖いからやめよう」私たちは足早にその場を離れた。でも、その夜から奇妙なことが起き始めた...',
        nextScene: 'ending_safe'
      },
      {
        id: 'ending_safe',
        text: 'トイレに行くたびに、誰かに見られている気がする。花子さんは、呼ばれるのを待っているのかもしれない。',
        nextScene: null
      }
    ]
  },
  {
    id: 'stairs',
    title: '13階段の呪い',
    subtitle: '深夜の学校',
    description: '普段12段の階段が、深夜になると13段になるという...',
    thumbnail: '/static/images/stairs_thumb.jpg',
    category: 'school',
    scenes: [
      {
        id: 'start',
        background: '/static/images/school_night.jpg',
        bgm: '/static/audio/bgm_dark.mp3',
        text: '肝試しで夜の学校に忍び込んだ。懐中電灯の光だけが頼りだ。',
        nextScene: 'scene1'
      },
      {
        id: 'scene1',
        text: '「この階段、昼間は12段なのに、夜中になると13段になるって噂があるんだ」',
        character: '太郎',
        nextScene: 'scene2'
      },
      {
        id: 'scene2',
        text: '確かめるために、階段を数えながら上ることにした。',
        choices: [
          {
            text: 'ゆっくり数える',
            nextScene: 'count_slow'
          },
          {
            text: '急いで上る',
            nextScene: 'count_fast'
          }
        ]
      },
      {
        id: 'count_slow',
        text: '「1...2...3...」ゆっくりと階段を数えながら上る。「10...11...12...」',
        nextScene: 'thirteen'
      },
      {
        id: 'thirteen',
        text: 'そして...「13」',
        effects: [
          { type: 'shake', duration: 1000 },
          { type: 'sound', sound: '/static/audio/thunder.mp3' }
        ],
        nextScene: 'disappear'
      },
      {
        id: 'disappear',
        text: '13段目を踏んだ瞬間、世界が歪んだ。気がつくと、見知らぬ場所に立っていた。',
        background: '/static/images/void.jpg',
        nextScene: 'ending_lost'
      },
      {
        id: 'ending_lost',
        text: 'それ以来、太郎を見た者はいない。学校の階段は今も、夜になると13段になるという。',
        nextScene: null
      },
      {
        id: 'count_fast',
        text: '怖くなって駆け上がった。数える余裕なんてなかった。',
        nextScene: 'ending_escape'
      },
      {
        id: 'ending_escape',
        text: '無事に上の階にたどり着いた。でも、下を見ると階段が歪んで見えた。あれは本当に12段だったのだろうか？',
        nextScene: null
      }
    ]
  },
  {
    id: 'music_room',
    title: '音楽室のベートーベン',
    subtitle: '動く肖像画',
    description: '深夜の音楽室から聞こえるピアノの音。そして動き出す肖像画...',
    thumbnail: '/static/images/music_thumb.jpg',
    category: 'school',
    scenes: [
      {
        id: 'start',
        background: '/static/images/music_room.jpg',
        bgm: '/static/audio/bgm_piano.mp3',
        text: '部活の練習で遅くなった。音楽室の前を通りかかると、中からピアノの音が聞こえてきた。',
        nextScene: 'scene1'
      },
      {
        id: 'scene1',
        text: '誰もいないはずの音楽室。でも確かに「エリーゼのために」が流れている。',
        effects: [{ type: 'sound', sound: '/static/audio/elise.mp3' }],
        choices: [
          {
            text: '中を覗く',
            nextScene: 'peek'
          },
          {
            text: '逃げる',
            nextScene: 'run'
          }
        ]
      },
      {
        id: 'peek',
        text: 'ドアの隙間から中を覗いた。誰もいない...でも、ピアノの鍵盤が勝手に動いている！',
        effects: [{ type: 'shake', duration: 500 }],
        nextScene: 'portrait'
      },
      {
        id: 'portrait',
        text: 'そして気づいた。壁のベートーベンの肖像画...目が、こちらを見ている！',
        background: '/static/images/beethoven.jpg',
        effects: [{ type: 'flash', duration: 300 }],
        nextScene: 'ending_horror'
      },
      {
        id: 'ending_horror',
        text: '肖像画が笑った気がした。その瞬間、ピアノの音が止まり、廊下の電気が消えた。暗闇の中、何かが近づいてくる音がする...',
        bgm: null,
        effects: [{ type: 'fade', duration: 2000 }],
        nextScene: null
      },
      {
        id: 'run',
        text: '恐怖で足が震えたが、必死に走って逃げた。',
        nextScene: 'ending_safe'
      },
      {
        id: 'ending_safe',
        text: '翌日、音楽室を確認したが何も異常はなかった。でも、ベートーベンの肖像画だけは、なぜか微笑んでいるように見えた。',
        nextScene: null
      }
    ]
  },
  {
    id: 'umibozu',
    title: '海坊主の恐怖',
    subtitle: 'お盆の海',
    description: 'お盆に海に入ってはいけない。そこには海坊主が...',
    thumbnail: '/static/images/sea_thumb.jpg',
    category: 'sea',
    scenes: [
      {
        id: 'start',
        background: '/static/images/beach.jpg',
        bgm: '/static/audio/bgm_wave.mp3',
        text: 'お盆なのに友達と海に来てしまった。「お盆の海は危険だ」と祖母が言っていたけど...',
        nextScene: 'scene1'
      },
      {
        id: 'scene1',
        text: '海は穏やかで、とても危険には見えなかった。',
        choices: [
          {
            text: '泳ぐ',
            nextScene: 'swim'
          },
          {
            text: '浜辺で待つ',
            nextScene: 'wait'
          }
        ]
      },
      {
        id: 'swim',
        text: '海に入って泳ぎ始めた。水は冷たくて気持ちいい。',
        nextScene: 'shadow'
      },
      {
        id: 'shadow',
        text: 'しばらく泳いでいると、水面に大きな黒い影が現れた。',
        effects: [{ type: 'shake', duration: 500 }],
        nextScene: 'umibozu_appear'
      },
      {
        id: 'umibozu_appear',
        background: '/static/images/umibozu.jpg',
        text: '巨大な黒い坊主頭が水面から現れた。「ひしゃくを貸せ...」',
        character: '海坊主',
        effects: [
          { type: 'sound', sound: '/static/audio/monster_voice.mp3' },
          { type: 'flash', duration: 200 }
        ],
        choices: [
          {
            text: 'ひしゃくを渡す',
            nextScene: 'give_ladle'
          },
          {
            text: '無視して逃げる',
            nextScene: 'escape'
          }
        ]
      },
      {
        id: 'give_ladle',
        text: 'なぜか持っていたひしゃくを渡すと、海坊主はそれで海水を汲み始めた。そして...',
        nextScene: 'ending_sink'
      },
      {
        id: 'ending_sink',
        text: '海坊主は船に水を入れ始めた。どんどん水が入ってくる。沈む...沈んでいく...',
        effects: [{ type: 'fade', duration: 3000 }],
        nextScene: null
      },
      {
        id: 'escape',
        text: '必死に岸へ向かって泳いだ。背後から恐ろしい声が聞こえる。',
        nextScene: 'ending_survive'
      },
      {
        id: 'ending_survive',
        text: 'なんとか浜辺にたどり着いた。振り返ると、海には何もいなかった。でも、お盆の海には二度と入らないと誓った。',
        nextScene: null
      },
      {
        id: 'wait',
        text: '嫌な予感がして浜辺で待つことにした。',
        nextScene: 'ending_wise'
      },
      {
        id: 'ending_wise',
        text: 'しばらくすると、沖の方で黒い何かが動いているのが見えた。やはり祖母の言うことは正しかった。',
        nextScene: null
      }
    ]
  },
  {
    id: 'kamikakushi',
    title: '山の神隠し',
    subtitle: 'キャンプ場の怪',
    description: '山でのキャンプ。一人だけ姿を消した友人の行方は...',
    thumbnail: '/static/images/mountain_thumb.jpg',
    category: 'mountain',
    scenes: [
      {
        id: 'start',
        background: '/static/images/camp.jpg',
        bgm: '/static/audio/bgm_forest.mp3',
        text: '夏休み、友達とキャンプに来た。楽しい時間を過ごしていたが、夜になって一人が行方不明になった。',
        nextScene: 'scene1'
      },
      {
        id: 'scene1',
        text: '「健太はどこに行った？」トイレに行くと言って30分も戻ってこない。',
        character: '私',
        choices: [
          {
            text: '探しに行く',
            nextScene: 'search'
          },
          {
            text: '大人を呼ぶ',
            nextScene: 'call_help'
          }
        ]
      },
      {
        id: 'search',
        text: '懐中電灯を持って森の中へ入った。健太の名前を呼びながら歩く。',
        background: '/static/images/dark_forest.jpg',
        nextScene: 'strange_path'
      },
      {
        id: 'strange_path',
        text: '見たことのない道が現れた。こんな道、昼間はなかったはずだ。',
        effects: [{ type: 'fade', duration: 1000 }],
        choices: [
          {
            text: '道を進む',
            nextScene: 'follow_path'
          },
          {
            text: '引き返す',
            nextScene: 'go_back'
          }
        ]
      },
      {
        id: 'follow_path',
        text: '道を進むと、古い鳥居が現れた。その先に健太が立っていた。でも様子がおかしい。',
        background: '/static/images/torii.jpg',
        nextScene: 'possessed'
      },
      {
        id: 'possessed',
        text: '「健太？」呼びかけると、ゆっくりと振り返った。その目は真っ白だった。',
        effects: [
          { type: 'flash', duration: 200 },
          { type: 'sound', sound: '/static/audio/scream.mp3' }
        ],
        nextScene: 'ending_mystery'
      },
      {
        id: 'ending_mystery',
        text: '次の瞬間、意識を失った。気がつくとキャンプ場にいた。健太は3日後に山で発見されたが、その3日間の記憶はないという。',
        nextScene: null
      },
      {
        id: 'go_back',
        text: '不気味な感じがして引き返した。',
        nextScene: 'ending_safe'
      },
      {
        id: 'call_help',
        text: '大人を呼んで捜索を始めた。',
        nextScene: 'ending_found'
      },
      {
        id: 'ending_found',
        text: '健太は翌朝、山の中で発見された。「天狗に連れて行かれた」と繰り返すばかりだった。',
        nextScene: null
      },
      {
        id: 'ending_safe',
        text: 'キャンプ場に戻ると、健太が普通に座っていた。「トイレで迷った」と言うが、1時間も何をしていたのだろうか。',
        nextScene: null
      }
    ]
  },
  {
    id: 'obon',
    title: '迎え火の霊',
    subtitle: 'お盆の夜',
    description: '迎え火を焚いた夜、見知らぬ老人が現れて...',
    thumbnail: '/static/images/obon_thumb.jpg',
    category: 'obon',
    scenes: [
      {
        id: 'start',
        background: '/static/images/obon_night.jpg',
        bgm: '/static/audio/bgm_obon.mp3',
        text: 'お盆の初日、迎え火を焚いて先祖の霊を迎える準備をした。',
        nextScene: 'scene1'
      },
      {
        id: 'scene1',
        text: '火が消えかけた頃、玄関に人影が立っていることに気づいた。',
        effects: [{ type: 'fade', duration: 1000 }],
        nextScene: 'oldman'
      },
      {
        id: 'oldman',
        text: '着物を着た老人が立っていた。「お迎えありがとうございます」と深く頭を下げた。',
        character: '謎の老人',
        choices: [
          {
            text: '家に招き入れる',
            nextScene: 'invite'
          },
          {
            text: '断る',
            nextScene: 'refuse'
          }
        ]
      },
      {
        id: 'invite',
        text: '老人を家に入れた。仏壇の前で手を合わせ始める。',
        nextScene: 'story'
      },
      {
        id: 'story',
        text: '「私はこの家の先々代の主人です。やっと帰ってこられました」',
        character: '老人',
        effects: [{ type: 'shake', duration: 500 }],
        nextScene: 'photo'
      },
      {
        id: 'photo',
        text: '仏壇の古い写真を見ると、確かにこの老人にそっくりだった。でも、それは100年前に亡くなった人のはず...',
        nextScene: 'ending_ancestor'
      },
      {
        id: 'ending_ancestor',
        text: '朝になると老人の姿は消えていた。仏壇には新しい線香の香りが漂っていた。本当に先祖が帰ってきたのだろうか。',
        nextScene: null
      },
      {
        id: 'refuse',
        text: '「申し訳ありませんが...」と断った。',
        nextScene: 'disappear'
      },
      {
        id: 'disappear',
        text: '老人は悲しそうな顔をして、闇の中に消えていった。',
        effects: [{ type: 'fade', duration: 2000 }],
        nextScene: 'ending_regret'
      },
      {
        id: 'ending_regret',
        text: 'その夜から、仏壇の周りで不思議な物音がするようになった。断ってしまったことを後悔している。',
        nextScene: null
      }
    ]
  },
  {
    id: 'kuchisake',
    title: '口裂け女',
    subtitle: '都市伝説',
    description: 'マスクをした女性に「私、きれい？」と聞かれたら...',
    thumbnail: '/static/images/kuchisake_thumb.jpg',
    category: 'urban',
    scenes: [
      {
        id: 'start',
        background: '/static/images/evening_street.jpg',
        bgm: '/static/audio/bgm_urban.mp3',
        text: '塾の帰り道、薄暗い通りを一人で歩いていた。',
        nextScene: 'scene1'
      },
      {
        id: 'scene1',
        text: '向こうから、大きなマスクをした女性が歩いてきた。すれ違う時、突然立ち止まった。',
        nextScene: 'question'
      },
      {
        id: 'question',
        text: '「ねえ...私、きれい？」',
        character: 'マスクの女',
        choices: [
          {
            text: 'きれいです',
            nextScene: 'answer_yes'
          },
          {
            text: 'きれいじゃない',
            nextScene: 'answer_no'
          },
          {
            text: '普通です',
            nextScene: 'answer_normal'
          }
        ]
      },
      {
        id: 'answer_yes',
        text: '「そう？じゃあ...これでも？」',
        character: 'マスクの女',
        nextScene: 'reveal'
      },
      {
        id: 'reveal',
        background: '/static/images/kuchisake.jpg',
        text: 'マスクを外すと、口が耳まで裂けていた！',
        effects: [
          { type: 'flash', duration: 300 },
          { type: 'sound', sound: '/static/audio/scream.mp3' },
          { type: 'shake', duration: 1000 }
        ],
        nextScene: 'chase'
      },
      {
        id: 'chase',
        text: '「あなたもこうしてあげる！」ハサミを取り出して追いかけてきた！',
        choices: [
          {
            text: '逃げる',
            nextScene: 'run_away'
          },
          {
            text: 'ポマードと3回言う',
            nextScene: 'pomade'
          }
        ]
      },
      {
        id: 'run_away',
        text: '必死に走った。でも口裂け女は異常な速さで追いかけてくる！',
        nextScene: 'ending_caught'
      },
      {
        id: 'ending_caught',
        text: '結局追いつかれてしまった。その後のことは...思い出したくない。',
        effects: [{ type: 'fade', duration: 3000 }],
        nextScene: null
      },
      {
        id: 'pomade',
        text: '「ポマード！ポマード！ポマード！」',
        nextScene: 'ending_escape'
      },
      {
        id: 'ending_escape',
        text: '口裂け女は急に動きを止めて、困った顔をして去っていった。都市伝説の対処法が本当に効いたようだ。',
        nextScene: null
      },
      {
        id: 'answer_no',
        text: '「きれいじゃない...？」女の目が怒りで燃え上がった。',
        nextScene: 'ending_bad'
      },
      {
        id: 'ending_bad',
        text: '次の瞬間、ハサミが振り下ろされた。それが最後の記憶だ。',
        effects: [{ type: 'flash', duration: 500 }],
        nextScene: null
      },
      {
        id: 'answer_normal',
        text: '「普通...？」女は困惑したような顔をした。',
        nextScene: 'ending_confused'
      },
      {
        id: 'ending_confused',
        text: '予想外の答えに戸惑ったのか、女はそのまま去っていった。正解だったのかもしれない。',
        nextScene: null
      }
    ]
  },
  {
    id: 'teketeke',
    title: 'テケテケ',
    subtitle: '線路の怪異',
    description: '上半身だけの何かが、猛スピードで追いかけてくる...',
    thumbnail: '/static/images/teketeke_thumb.jpg',
    category: 'urban',
    scenes: [
      {
        id: 'start',
        background: '/static/images/railway.jpg',
        bgm: '/static/audio/bgm_tension.mp3',
        text: '夜遅く、線路沿いの道を歩いて帰っていた。',
        nextScene: 'scene1'
      },
      {
        id: 'scene1',
        text: '遠くから奇妙な音が聞こえてきた。「テケテケテケ...」',
        effects: [{ type: 'sound', sound: '/static/audio/teketeke.mp3' }],
        nextScene: 'scene2'
      },
      {
        id: 'scene2',
        text: '音がどんどん近づいてくる。振り返ると...',
        choices: [
          {
            text: '振り返る',
            nextScene: 'look_back'
          },
          {
            text: '振り返らずに走る',
            nextScene: 'run_immediately'
          }
        ]
      },
      {
        id: 'look_back',
        background: '/static/images/teketeke.jpg',
        text: '上半身だけの女が、腕を使って猛スピードでこちらに向かってきた！',
        effects: [
          { type: 'flash', duration: 200 },
          { type: 'shake', duration: 1000 },
          { type: 'sound', sound: '/static/audio/horror_scream.mp3' }
        ],
        nextScene: 'question_teke'
      },
      {
        id: 'question_teke',
        text: '「私の下半身を知らない？」',
        character: 'テケテケ',
        choices: [
          {
            text: '知らない',
            nextScene: 'dont_know'
          },
          {
            text: '線路にある',
            nextScene: 'at_railway'
          }
        ]
      },
      {
        id: 'dont_know',
        text: '「じゃあ、あなたの下半身をもらうわ！」',
        character: 'テケテケ',
        nextScene: 'ending_attack'
      },
      {
        id: 'ending_attack',
        text: '鋭い爪が振り下ろされた。それ以上のことは...覚えていない。',
        effects: [{ type: 'flash', duration: 500 }],
        nextScene: null
      },
      {
        id: 'at_railway',
        text: '「そう...探してくる」テケテケは線路の方へ去っていった。',
        nextScene: 'ending_mercy'
      },
      {
        id: 'ending_mercy',
        text: '命は助かったが、今でも「テケテケ」という音を聞くと、あの恐怖が蘇る。',
        nextScene: null
      },
      {
        id: 'run_immediately',
        text: '振り返らずに全力で走った。背後から「テケテケ」という音が迫ってくる！',
        nextScene: 'escape_attempt'
      },
      {
        id: 'escape_attempt',
        text: '家まであと少し。でも音はすぐ後ろまで来ている！',
        effects: [{ type: 'shake', duration: 500 }],
        nextScene: 'ending_home'
      },
      {
        id: 'ending_home',
        text: 'なんとか家にたどり着いた。ドアを閉めた瞬間、外で何かがドアを引っ掻く音がした。朝まで震えて過ごした。',
        nextScene: null
      }
    ]
  }
];