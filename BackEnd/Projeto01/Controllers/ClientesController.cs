using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Projeto01.DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projeto01.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Clientes> Listar()
        {
            ClienteDAO Cliente = new ClienteDAO();
            return Cliente.Listar();
        }

        [HttpGet("Id")]
        public Clientes ListarPorId(int Id)
        {
            ClienteDAO Cliente = new ClienteDAO();
            return Cliente.ListaPorId(Id);
        }
        [HttpPut]
        public Clientes AtualizarClientes(Clientes Cliente)
        {
            ClienteDAO editar = new ClienteDAO();
            return editar.AtualizarCliente(Cliente);
        }

        [HttpDelete("Id")]
        public void DeletarClientes(int Id)
        {
            ClienteDAO deletar = new ClienteDAO();
            deletar.DeletarCliente(Id);
        }

        [HttpPost]
        public void Cadastrar([FromBody]Clientes ClienteCadastro)
        {
            ClienteCadastro.DataCadastro = DateTime.Now; 
            ClienteDAO Cliente = new ClienteDAO();
            Cliente.Cadastrar(ClienteCadastro);
        }
    }
}
