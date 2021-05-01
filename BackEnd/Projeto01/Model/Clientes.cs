using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Projeto01
{
    public class Clientes
    {
        [Key]
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Idade { get; set; }
        public DateTime DataCadastro { get; set; }
    }
}
