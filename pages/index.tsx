import Button from "@/components/Button";
import Input from "@/components/Input";
import ToggleButton from "@/components/ToggleButton";

export default function Home() {
  return (
    <>
      <Input
        placeholder="ID"
        disabled={false}
        type="text"
        helperText="helperText"
      />
      <Input
        placeholder="ID"
        disabled={true}
        type="text"
        helperText="helperText"
      />
      <Input
        placeholder="ID"
        disabled={false}
        type="text"
        helperText="helperText"
        state="correct"
      />
      <Button>해위</Button>
      <Button filled>해위</Button>
      <Button disabled>해위</Button>
      <select name="고양이선택" id="select-cat" defaultValue="기본값" required>
        <option value="기본값" disabled>
          선택해주세요
        </option>
        <option value="하디1">하디 1</option>
        <option value="하디2">하디 2</option>
        <option value="하디3">하디 3</option>
      </select>
      <ToggleButton />
    </>
  );
}
