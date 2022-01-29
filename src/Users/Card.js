export default function Card(props) {
  
  const {name,age} = props;

  return (
    <div className="bg-pink-200 flex justify-center">
      <h1>{name} ({age} Years Old)</h1>
    </div>
  );
}
