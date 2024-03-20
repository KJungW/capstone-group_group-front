import "styles/Item.css";

const Item = (props) => {
  const { data } = props;
  return (
    <div className="Item">
      <div className="requirement">
        <div>
          참여요건{data.id}:{data.condition}
        </div>
      </div>
      <div className="inputline">
        {data.file && <button>파일 업로드</button>}
        <input type="text" />
      </div>
    </div>
  );
};

export default Item;
