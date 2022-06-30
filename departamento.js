const departamento={template:`
<div>
<button type="button"
class="btn btn-primary m-2 float-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
    Adicionar Departamento
</button>

<table class="table table-striped">
    <thead>
        <tr>
            <th>
                DepartamentoID
            </th>
            <th>
                DepartamentoNome
            </th>
            <th>
               Opções
            </th>
        </tr>
    </thead>    
    <tbory>
        <tr v-for="dep in departamentos">
            <td>{{dep.DepartamentoID}}</td>
            <td>{{dep.DepartamentoNome}}</td>
            <td>
                <button type="button" class="btn-light mr-1"
                class="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                @click="editClick()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>
                <button type="button" @click="deleteClick(dep.DepartamentoID)
                class="btn-light mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>
            {{dep.Opções}}
            </td>
        </tr>
    </tbory>
</table>
<div class="modal fade" id="exampleModal" tabindex="-1">
    aria-labelledby="exampleModelLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal
        arial-label="Close"></button>
    </div>

    <div class="modal-body">
        <div class="input-group mb-3">
            <span class="input-group-text">Nome Departamento</span>
            <input type="text" class="form-control" v-model="DepartamentoNome">
        </div>

        <button type="button @click="createClick()"
        v-if="DepartamentoID==0" class="btn btn-primary">
        Criar
        </button>
        <button type="button @click="updateClick()"
        v-if="DepartamentoNome==0" class="btn btn-primary">
        Criar
        </button>
    </div>
    
</div>
</div>
</div>

</div>
    `,


    data(){
        return{
            departamentos:[],
            modalTitle:"",
            DepartamentoNome:"",
            DepartamentoId:0
        }
    },
    methods: {
        refreData(){
            axios.get(variaveis.API_URL+"departamento")
            .then((response)=>{
                this.departamentos=response.data;
            });
        },
        addClick(){
            this.modalTitle="Adicionar Departamento";
            this.DepartamentoId=0;
            this.DepartamentoNome="";
        },
        editClick(){
            this.modalTitle="Editar Departamento";
            this.DepartamentoId=dep.DepartamentoId;
            this.DepartamentoNome=dep.DepartamentoNome;
        },
        createClick(){
            axios.post(variaveis.API_URL+"departamento",{
                DepartamentoNome:this.DepartamentoNome
            })
            .then((response)=>{
                this.refreData();
                alert(response.data);
            });
        },
        updateClick(){
            axios.put(variaveis.API_URL+"departamento",{
                DepartamentoId:this.DepartamentoId,
                DepartamentoNome:this.DepartamentoNome
            })
            .then((response)=>{
                this.refreData();
                alert(response.data);

            });
        },
        deleteClick(id){
            if(!confirmar("Realmente deseja excluir esse registro?")){
                return;
            }
            axios.delete(variaveis.API_URL+"departamento/"+id)
            .then((response)=>{
                this.departamentos=response.data;
            });
        }


    },
    mouted:function(){
        this.refreshData();
    }

};