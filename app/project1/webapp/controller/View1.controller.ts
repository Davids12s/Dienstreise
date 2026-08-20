import Controller from "sap/ui/core/mvc/Controller";
import Event from "sap/ui/base/Event";

/**
 * @namespace project1.controller
 */
export default class View1 extends Controller {

   public onInit(): void {
    const router = (this.getOwnerComponent() as any).getRouter();
    router.getRoute("RouteView1").attachPatternMatched(this.onRouteMatched, this);
}

private onRouteMatched(): void {
    const table = this.byId("tripsTable") as any;
    const binding = table?.getBinding("items");
    binding?.refresh();
}

    public onItemPress(event: Event): void {
        const source = event.getSource() as any;
        const context = source.getBindingContext();
        const path = context.getPath();
        const key = path.split("(")[1].split(")")[0].replace(/'/g, "");
        const router = (this.getOwnerComponent() as any).getRouter();
        router.navTo("RouteDetail", { key: key });
    }

    public onCreatePress(): void {
        const router = (this.getOwnerComponent() as any).getRouter();
        router.navTo("RouteNew");
    }
}