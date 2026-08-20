import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";

/**
 * @namespace project1.controller
 */
export default class New extends Controller {

   public onInit(): void {
    const router = (this.getOwnerComponent() as any).getRouter();
    router.getRoute("RouteNew").attachPatternMatched(this.onRouteMatched, this);
}

private onRouteMatched(): void {
    const emptyTrip = new JSONModel({
        zielort: "",
        startdate: "",
        enddate: "",
        transportmittel: "AUTO",
        abflugort: "",
        abflugdatum: "",
        ankunftsort: "",
        ankunftsdatum: ""
    });
    this.getView()?.setModel(emptyTrip, "newTrip");
}

    public onSavePress(): void {
    const data = (this.getView()?.getModel("newTrip") as JSONModel).getData();

    if (data.transportmittel != "FLUGZEUG") {
        delete data.abflugort;
        delete data.abflugdatum;
        delete data.ankunftsort;
        delete data.ankunftsdatum;
    }

    const oModel = this.getOwnerComponent()!.getModel() as any;
    const listBinding = oModel.bindList("/Dienstreisen") as ODataListBinding;

    const context = listBinding.create(data);

    context.created()?.then(() => {
        MessageToast.show("Dienstreise wurde angelegt.");
        const router = (this.getOwnerComponent() as any).getRouter();
        router.navTo("RouteView1");
    }).catch((error: any) => {
        const message = error?.cause?.message || error?.message || "Unbekannter Fehler";
        MessageToast.show(message);
    });
}

    public onNavBack(): void {
        const router = (this.getOwnerComponent() as any).getRouter();

       
        router.navTo("RouteView1");
    }
}