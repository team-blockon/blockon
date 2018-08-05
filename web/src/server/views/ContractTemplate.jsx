const React = require('react');

/**
 * 계약서 템플릿 컴포넌트
 * @param props 부모 컴포넌트로부터 넘겨받는 값
 */
const ContractTemplate = props => {
  return (
    <div>
      <p>소재지: {props.location}</p>
      <p>매도인: {props.seller}</p>
      <p>매수인: {props.buyer}</p>
      <p>계약금: {props.downPayment}</p>
      <p>중도금: {props.middlePayment}</p>
      <p>잔금: {props.balance}</p>
      <p>계약일: {props.contractDate}</p>
    </div>
  );
};

module.exports = ContractTemplate;
