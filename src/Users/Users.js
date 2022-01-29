import Card from "./Card";

export default function Users(props) {
  const { userData } = props;
  

  return (
    <div className="w-1/3">
      {userData.map((obj) => {
        return <Card key={obj.id} name={obj.name} age={obj.age}></Card>;
      })}
    </div>
  );
}
