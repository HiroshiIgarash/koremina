import { fireEvent, render } from "@testing-library/react";
import PostForm from "./PostForm";

it("適切なIDを入力するとサムネイルが出てくる", () => {
  const {getByLabelText, findByRole}= render(<PostForm />);

  fireEvent.input(getByLabelText('youtube ID'),{
    target: {
      value: 'k9Eewd8TEWE'
    }
  })

  findByRole('img')
});
