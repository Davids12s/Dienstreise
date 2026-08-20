import Controller from "sap/ui/core/mvc/Controller";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
/**
 * @namespace dienstreise.controller
 */
export default class Detail extends Controller {

    private currentKey: string = "";


    public onInit(): void {
        const router = (this.getOwnerComponent() as any).getRouter();
        router.getRoute("RouteDetail").attachPatternMatched(this.onPatternMatched, this);
    }

    private onPatternMatched(event: any): void {
        const key = event.getParameter("arguments").key;
        this.currentKey = key;
        this.getView()?.bindElement({
            path: "/Dienstreisen('" + key + "')"
        });
    }

    public onEdit(event: Event){
        const router 
    }

    public onNavBack(): void {
        const router = (this.getOwnerComponent() as any).getRouter();
        router.navTo("RouteView1");
    }

    public onAddKommentar(): void {

        const text = (this.byId("addKommentar") as any).getValue();



        const oModel = this.getOwnerComponent()!.getModel() as any;
        const listBinding = oModel.bindList("/Kommentare") as ODataListBinding;


        const context = listBinding.create({
            inhalt: text,
            dienstreise_ID: this.currentKey
        });

        context.created()?.then(() => {
            (this.byId("addKommentar") as any).setValue("");

            const table = this.byId("Kommentare") as any;
            const tableBinding = table?.getBinding("items");
            tableBinding?.refresh();
        }).catch((error: any) => {
            console.log(error);
        });
    }

   public onUploadPress(): void {
    const fileUploader = this.byId("fileUploader") as any;
    const fileInputElement = fileUploader.oFileUpload; // internes <input>-Element

    const file = fileInputElement?.files?.[0];

    if (!file) {
        console.log("Keine Datei ausgewählt");
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        const oModel = this.getOwnerComponent()!.getModel() as any;
        const listBinding = oModel.bindList("/Attachements") as ODataListBinding;

        listBinding.create({
            title: file.name,
            type: file.type,
            file: base64,
            dienstreise_ID: this.currentKey
        });
    };
    reader.readAsDataURL(file);
}
}