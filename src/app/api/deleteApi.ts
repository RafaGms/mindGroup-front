export const deleteTransactionApi = async (id: number): Promise<void> => {
   try {
      const response = await fetch(`http://localhost:8000/transactions/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      });

      if (!response.ok) {
         const errorText = await response.text();
         throw new Error(`Erro ao excluir transação: ${errorText}`);
      }
   } catch (error) {
      if (error instanceof Error) {
         console.error('Erro ao excluir transação:', error.message);
         throw error;
      } else {
         console.error('Erro desconhecido ao excluir transação');
         throw new Error('Erro desconhecido ao excluir transação');
      }
   }
};
