import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DiceComponent.css';

const DiceComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialMemberFrom = queryParams.get('members') ? decodeURIComponent(queryParams.get('members')) : "★\n松本\n千原\n兵動\n原西\n宮川\n徳井\n綾部\n木村\nコバヤシ\n小藪\n春日";
  const [memberFrom, setMemberFrom] = useState(initialMemberFrom);
  const [shuffledMembers, setShuffledMembers] = useState([]);
  const [isPush, setIsPush] = useState(false);

  const members = memberFrom.split(/\n/).filter((item, index) => {
    if (item === "★" && index !== 0) return false;
    return item !== '';
  });

  const setMember = () => {
    const array = [];
    for (let i = 0, j = 0; i < 12; i++) {
      if (!members[j]) j = 1;
      array[i] = members[j];
      j++;
    }
    setShuffledMembers(array);
  }

  const updateMember = () => {
    const array = [];
    for (let i = 0; i < 12; i++) {
      let tmp = members[Math.floor(Math.random() * members.length)];
      if (tmp === "★" && array.includes('★')) {
        i--;
      } else {
        array[i] = tmp;
      }
    }

    for (let i = array.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      const tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }

    setShuffledMembers(array);
  }

  const shuffleMember = () => {
    setIsPush(true);
    const diceElement = document.getElementById("dice");
    diceElement.classList.remove("idoling");
    diceElement.classList.remove("rolling");
    diceElement.classList.add("rolling");

    setTimeout(updateMember, 1000);
    setTimeout(() => {
      diceElement.classList.remove("rolling");
      setIsPush(false);
    }, 3000);
  }

  useEffect(() => {
    setMember();
  }, [memberFrom]);

  useEffect(() => {
    navigate(`?members=${encodeURIComponent(memberFrom)}`);
  }, [memberFrom, navigate]);

  return (
    <div className="home">
      <h1><span>例</span><span>の</span><span>サ</span><span>イ</span><span>コ</span><span>ロ</span></h1>
      <div className="hole">
        <ol id="dice" className="idoling">
          {shuffledMembers.map((member, key) => (
            <li key={key}>
              <span></span>
              <p className="name">{member}</p>
            </li>
          ))}
        </ol>
      </div>
      <button className="throw" onClick={shuffleMember} disabled={isPush}>サイコロを振る</button>
      <p className="description">メンバーの名前を入力してください。</p>
      <textarea value={memberFrom} onChange={e => { setMemberFrom(e.target.value); setMember(); }} placeholder="名前を入力してください" cols="12"></textarea>
    </div>
  );
}

export default DiceComponent;
