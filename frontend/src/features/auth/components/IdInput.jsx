const IdInput = ({ id, setId, placeholder = "아이디" }) => {
  return (
    <div>
      <input
        type="text"
        id="id-input"
        placeholder={placeholder}
        value={id}
        onChange={(e) => {
          // console.log(e);
          setId(e.target.value);
        }}
        required
      />
    </div>
  );
};
export default IdInput;
