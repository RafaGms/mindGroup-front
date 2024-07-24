export const editTransactionApi = async (transactionId: number, updatedTransaction: { description: string, amount: number, type: string }) => {
   const response = await fetch(`http://localhost:8000/transactions/${transactionId}`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTransaction),
   });

   if (!response.ok) {
      throw new Error('Erro ao editar transação');
   }

   return response.json();
};