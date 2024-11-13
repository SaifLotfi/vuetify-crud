import {render} from '@testing-library/vue'
import EmployeeCardsComponent from '../EmployeeCards.vue'
import FormComponent from '../Form.vue'

test('add card on valid form submit',async()=>{
  render(EmployeeCardsComponent);
  render(FormComponent);
});


