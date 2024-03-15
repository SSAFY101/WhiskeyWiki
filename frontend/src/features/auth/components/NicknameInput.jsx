const NicknameInput = ({ nickname, setNickname, placeholder = "닉네임" }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={nickname}
        onChange={(e) => {
          setNickname(e.target.value);
        }}
        required
      />
    </div>
  );
};

export default NicknameInput;
