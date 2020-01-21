<template>
  <div>
     <my-select></my-select>  
     <my-select1></my-select1> 
     <my-form></my-form> 
     <my-transfer></my-transfer>
     <my-table></my-table>
  </div>
</template>

<script>
import mySelect from './views/select';
import mySelect1 from './views/select1';
import myForm from './views/form';
import myTransfer from './views/transfer';
import myTable from './views/table';
export default {
    components: {mySelect, mySelect1, myForm, myTransfer, myTable}
}

</script>