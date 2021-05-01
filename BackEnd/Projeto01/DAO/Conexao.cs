using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Projeto01.DAO
{
    public class Conexao
    {
        private string Connection;

        public Conexao()
        {
            Connection = "Password = a278301; Persist Security Info = True; User ID = sa; Initial Catalog = bancoteste; Data Source = LAPTOP-N3GDSQB9";
        }

        public IDbConnection ConexaoBanco()
        {
            return new SqlConnection(Connection);
        }
    }
}
