import rawHoeren18 from '../data/de_thi_audio_va_transcript_hoeren_18_bai.json';
import rawQ22 from '../data/de_thi_tong_hop_q_22.json';
import rawF15 from '../data/de_thi_tong_hop_F_15.json';
import rawX22 from '../data/de_thi_tong_hop_x_22.json';
import rawGoetheB1 from '../data/GOETHE_B1_DE_THI_VA_DAP_AN.json';
import rawGoetheB2 from '../data/GOETHE_B2_DE_THI_VA_DAP_AN.json';

export interface BankOption {
  de: string;
  vi?: string;
  correct?: boolean;
}

export interface BankQuestion {
  stem: string;
  stemVi?: string;
  passage?: string;
  options: BankOption[];
  correctIdx: number;
}

export interface BankItem {
  id: string;
  kind: 'mc' | 'zuordnung' | 'lesen' | 'adj';
  title: string;
  titleVi?: string;
  passage?: string;
  questions: BankQuestion[];
}

export interface ExamBank {
  level: 'B1' | 'B2';
  label: string;
  items: BankItem[];
}

/* ---------- raw shapes ---------- */

interface Hoeren18Item {
  title: string;
  titleVi: string;
  audioText: string;
  exam?: { qDe: string; qVi: string; opts: { de: string; vi: string; c: boolean }[] }[];
}

interface Sit {
  audioText: string;
  rfDe: string;
  rfVi: string;
  r?: boolean;
  mcDe: string;
  mcVi: string;
  opts: { de: string; vi: string; c: boolean }[];
}

interface Q22Set {
  sits: Sit[];
}

interface F15Item {
  title: string;
  audioText: string;
  items: { de: string; vi: string; who?: string }[];
}

interface X22Item {
  de: string;
  vi: string;
  der: string;
  die: string;
  das: string;
}

interface GoetheB2Reading {
  title: string;
  texts: { p?: string; text: string }[];
  qs: { stem: string; ans: string }[];
  opts: string[];
}

const correctIdxOf = (opts: { de: string; vi?: string; c?: boolean }[]): number =>
  opts.findIndex((o) => o.c === true);

/* ---------- normalizers ---------- */

const hoeren18Bank = (rawHoeren18 as Hoeren18Item[]).map((item, i): BankItem => ({
  id: `hoeren18-${i}`,
  kind: 'mc',
  title: item.title,
  titleVi: item.titleVi,
  passage: item.audioText,
  questions: (item.exam || []).map((q) => ({
    stem: q.qDe,
    stemVi: q.qVi,
    options: q.opts,
    correctIdx: correctIdxOf(q.opts),
  })),
}));

const q22Bank = (rawQ22 as Q22Set[]).map((set, i): BankItem => ({
  id: `q22-${i}`,
  kind: 'mc',
  title: `Bộ đề Tổng Hợp #${i + 1}`,
  questions: set.sits.map((sit) => ({
    stem: sit.mcDe,
    stemVi: sit.mcVi,
    passage: sit.audioText,
    options: sit.opts,
    correctIdx: correctIdxOf(sit.opts),
  })),
}));

const f15Bank = (rawF15 as F15Item[]).map((set, i): BankItem => {
  const valid = set.items.filter((it) => it.who);
  const speakers = Array.from(new Set(valid.map((it) => it.who as string)));
  return {
    id: `f15-${i}`,
    kind: 'zuordnung',
    title: set.title,
    passage: set.audioText,
    questions: valid.map((it) => ({
      stem: it.de,
      stemVi: it.vi,
      options: speakers.map((s) => ({
        de: s,
        correct: s === it.who,
      })),
      correctIdx: speakers.indexOf(it.who as string),
    })),
  };
});

const SPEAKER_LABELS: Record<string, string> = {
  mann: 'Người đàn ông',
  frau: 'Người phụ nữ',
  moderator: 'Người dẫn chương trình',
};

const goetheB1LesenBank = (() => {
  const sar = (rawGoetheB1 as any).lesenBank?.situationsAndRules || {};
  return Object.keys(sar).map((title, i): BankItem => {
    const qs = sar[title] as { opts: string[]; correct: number }[];
    return {
      id: `b1-lesen-${i}`,
      kind: 'lesen',
      title,
      questions: qs.map((q, qi) => ({
        stem: `Câu ${qi + 1} — Chọn ý ĐÚNG theo nội dung trên.`,
        options: q.opts.map((o, oi) => ({ de: o, correct: oi === q.correct })),
        correctIdx: q.correct,
      })),
    };
  });
})();

const goetheB2LesenBank = (() => {
  const rd = (rawGoetheB2 as any).lesenBank?.readingData || {};
  const parts = Object.keys(rd);
  const items: BankItem[] = [];
  for (const part of parts) {
    const texts = rd[part] as GoetheB2Reading[];
    texts.forEach((t, i) => {
      items.push({
        id: `b2-lesen-${part}-${i}`,
        kind: 'lesen',
        title: t.title,
        passage: t.texts.map((x) => x.text).join('\n\n'),
        questions: t.qs.map((q) => ({
          stem: q.stem,
          options: t.opts.map((letter) => ({ de: letter, correct: letter === q.ans })),
          correctIdx: t.opts.indexOf(q.ans),
        })),
      });
    });
  }
  return items;
})();

const x22GenderBank = (rawX22 as X22Item[]).map((word, i): BankItem => {
  const phrases = [
    { article: 'der', phrase: word.der },
    { article: 'die', phrase: word.die },
    { article: 'das', phrase: word.das },
  ];
  return {
    id: `x22-${i}`,
    kind: 'adj',
    title: word.de,
    titleVi: word.vi,
    questions: phrases.map((p) => {
      const rest = p.phrase.replace(/^\S+\s+/, '');
      return {
        stem: `Chọn mạo từ ĐÚNG (giống) cho: "… ${rest}"`,
        options: [
          { de: 'der', correct: p.article === 'der' },
          { de: 'die', correct: p.article === 'die' },
          { de: 'das', correct: p.article === 'das' },
        ],
        correctIdx: ['der', 'die', 'das'].indexOf(p.article),
      };
    }),
  };
});

/* ---------- exported banks ---------- */

export const BANKS = {
  hoeren: {
    B1: {
      level: 'B1',
      label: 'Hörverstehen B1 — Nghe hiểu',
      items: [...hoeren18Bank, ...f15Bank],
    } as ExamBank,
  },
  lesen: {
    B1: {
      level: 'B1',
      label: 'Leseverstehen B1 — Đọc hiểu',
      items: [...q22Bank, ...goetheB1LesenBank],
    } as ExamBank,
    B2: {
      level: 'B2',
      label: 'Leseverstehen B2 — Đọc hiểu',
      items: goetheB2LesenBank,
    } as ExamBank,
  },
  sprach: {
    B1: {
      level: 'B1',
      label: 'Sprachbausteine B1 — Ngữ pháp ứng dụng',
      items: x22GenderBank,
    } as ExamBank,
  },
};

export type BankKind = BankItem['kind'];
export const speakerLabel = (key: string): string => SPEAKER_LABELS[key] || key;
