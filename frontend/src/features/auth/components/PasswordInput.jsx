const PasswordInput = ({ password, setPassword, placeholder = "비밀번호" }) => {
  return (
    <div>
      <input
        type="password"
        id="password"
        placeholder={placeholder}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
      />
    </div>
  );
};
export default PasswordInput