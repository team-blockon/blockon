// 계약종류(Contract Type) 상수
export const ct = Object.freeze({
  WOLSE: 1,
  JEONSE: 2,
  TRADE: 3
});

// 계약단계(Contract Step) 상수
export const cs = Object.freeze({
  START_TRADE: 0, // 거래시작
  DOWN_PAYMENT: 1, // 계약금 입금
  MIDDLE_PAYMENT: 2, // 중도금 입금
  FINAL_PAYMENT: 3, // 잔금 입금
  REGISTRATION: 4, // 등기 등록 신청
  FIXED_DATE: 5, // 확정일자
  COMPLETED_CONTRACT: 100 // 거래종료
});

// 매매 단계
export const tradeStep = [
  cs.START_TRADE,
  cs.DOWN_PAYMENT,
  cs.MIDDLE_PAYMENT,
  cs.FINAL_PAYMENT,
  cs.REGISTRATION,
  cs.COMPLETED_CONTRACT
];

// 전월세 단계
export const rentStep = [
  cs.START_TRADE,
  cs.DOWN_PAYMENT,
  cs.FINAL_PAYMENT,
  cs.FIXED_DATE,
  cs.COMPLETED_CONTRACT
];

/**
 * 특정 거래단계에 해당하는 단어 반환
 * @param {*} step 거래단계 상수
 */
export const getStepWord = step => {
  switch (step) {
  case cs.START_TRADE:
    return '거래시작';
  case cs.DOWN_PAYMENT:
    return '계약금';
  case cs.MIDDLE_PAYMENT:
    return '중도금';
  case cs.FINAL_PAYMENT:
    return '잔금';
  case cs.REGISTRATION:
    return '등기신청';
  case cs.FIXED_DATE:
    return '확정일자';
  case cs.COMPLETED_CONTRACT:
    return '거래종료';
  default:
  }
};

export const getNextStep = (contractType, currentStep) => {
  switch (contractType) {
  case ct.TRADE:
    for (const [index, step] of tradeStep.entries()) {
      if (step === currentStep) {
        return tradeStep[index + 1];
      }
    }
    break;
  case ct.WOLSE:
  case ct.JEONSE:
    for (const [index, step] of rentStep.entries()) {
      if (step === currentStep) {
        return rentStep[index + 1];
      }
    }
    break;
  default:
  }
};

export const getAgreementWord = agreement => {
  return agreement ? '동의' : '미동의';
};

export const getKoreanBuildingType = eng => {
  const map = {
    jutaek: '주택',
    apartment: '아파트',
    sangga: '상가',
    officetel: '오피스텔'
  };

  return map[eng];
};
