import { useState } from "react";
import SignupStep1 from "./components/SignupStep1";
import SignupStep2 from "./components/SignupStep2";

function Signup() {
  //스텝 설정
  const [step, setStep] = useState(1);
  //다음 단계로 넘어가는 함수
  const nextStep = () => setStep(step + 1);
  //현재 스탭에따라 렌더링할 컴포넌트 결정
  const renderStep = () => {
    switch (step) {
      case 1:
        return <SignupStep1 onNext={nextStep} />;
      case 2:
        return <SignupStep2 onNext={nextStep} />;
      default:
        return<SignupStep1/>
    }
  };

  return (
    <div>
      <h1>회원가입 페이지</h1>
      {/* ()로 결과물 출력 */}
      {renderStep()} 
    </div>
  )
}
export default Signup;
