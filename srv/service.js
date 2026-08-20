const cds = require("@sap/cds");
const { INSERT } = require("@sap/cds/lib/ql/cds-ql");

class DienstreisenService extends cds.ApplicationService {

    init() {

        const { Dienstreisen, Status, Kommentare } = this.entities

        if (Dienstreisen && Status) {

            this.after("CREATE", Dienstreisen, async (dienstreise) => {

                await INSERT.into(Status).entries({
                    status: 'NEU',
                    date: new Date(),
                    dienstreise_ID: dienstreise.ID
                })

            })

            this.after("UPDATE", Dienstreisen, async (dienstreise) => {
                if (dienstreise.hotelBuchungscode != null && dienstreise.flugBuchungscode != null) {


                    await INSERT.into(Status).entries({
                        status: 'GEBUCHT',
                        date: new Date(),
                        dienstreise_ID: dienstreise.ID
                    })
                }
        })




        }

        if (Kommentare) {

            this.before("CREATE", Kommentare, async (req) => {
                req.data.date = new Date();
                req.data.autor = req.user.id;

            })


            this.before(["DELETE", "UPDATE"], Kommentare, async (req) => {
                req.reject(403, "Löschen oder Ändern von Kommentaren ist nicht erlaubt.");
                console.log("Löschen wurde durchgeführt");
            })


            //Dienstreisen anlegen
            this.before("CREATE", Dienstreisen, async (req) => {
                const infos = req.data;

                if (infos.startdate > infos.enddate) {
                    req.reject(403, "Ungültige Start oder Enddaten ");

                }


                if (!infos.startdate || !infos.enddate || !infos.zielort) {
                    req.reject(400, "Fehlende Daten");
                }

                if (infos.transportmittel == "FLUGZEUG" && (!infos.abflugort || !infos.abflugdatum || !infos.ankunftsort || !infos.ankunftsdatum || !infos.rueckflugort || !infos.rueckflugdatum)) {
                    req.reject(400, "Ablugsort, Abflugdatum, Ankunftsort oder Ankunftsdatum fehlen");
                }
                if (infos.abflugdatum > infos.ankunftsdatum) {
                    req.reject(400, "Abflugsdatum muss vor Ankunftsdatum sein ");
                }


            })






        }
        return super.init()




    }
}
module.exports = DienstreisenService