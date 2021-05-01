using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Projeto01.DAO
{
    public class ClienteDAO
    {
        private IDbConnection Connection;

        public ClienteDAO()
        {
            Conexao Conexao = new Conexao();
            Connection = Conexao.ConexaoBanco();
        }

        public IEnumerable<Clientes> Listar()
        {
            string Query = @"Select * From Clientes";
            Connection.Open();
            return Connection.Query<Clientes>(Query);
        }

        public Clientes ListaPorId(int Id)
        {
            string Query = @"SELECT * FROM Clientes WHERE Id =" + Id;
            Connection.Open();
            Connection.Execute(Query);
            return Connection.Query<Clientes>(Query).FirstOrDefault();
        }

        public Clientes AtualizarCliente(Clientes Cliente)
        {
            string Query = @"UPDATE Clientes " +
                                "SET Nome = '" + Cliente.Nome + "', Idade = '" + Cliente.Idade + "' " +
                           "WHERE Id = " + Cliente.Id;
            Connection.Open();
            Connection.Execute(Query);
            return Connection.Query<Clientes>(Query).FirstOrDefault();
        }
        public void DeletarCliente(int Id)
        {
            string deleteQuery = @"DELETE FROM Clientes WHERE Id = " + Id;
            Connection.Open();
            Connection.Execute(deleteQuery);
        }

        public void Cadastrar(Clientes Cliente)
        {
            string insertQuery = @"INSERT INTO Clientes(Nome, Idade, DataCadastro) Values(@Nome, @Idade, @DataCadastro)";
            Connection.Open();
            Connection.Execute(insertQuery, Cliente);
        }
    }
}
