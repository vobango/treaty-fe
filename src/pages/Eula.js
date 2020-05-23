import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Layout from '../components/layout';

const Eula = () => {
  return (
    <Layout>
      <div className="flex flex-col px-16 xl:px-72 md:px-48 ">
        <Link to="/" className="underline">
          Tagasi esilehele
        </Link>
        <h1 className="eula-header">Privaatsustingimused</h1>
        <p>Kehtivad alates XX.XX.XXXX</p>
        <p>
          Privaatsustingimused reguleerivad isikuandmete töötlemist ja küpsiste
          kasutamist OÜ XXX, registrikood XXX, asukohaga AADRESS (edaspidi
          Ettevõte), veebilehel / rakenduses XXX (edaspidi Veebileht).
          <br />
          Kasutajad (ainsuses Kasutaja) on kõik isikud, kes külastavad
          Veebilehte, tarbivad teenuseid või edastavad Ettevõttele omalt poolt
          infot.
          <br />
          Ettevõte järgib andmete töötlemisel isikuandmete kaitse üldmäärusest
          2016/679 tulenevaid nõudeid.
        </p>
        <h1 className="eula-header">Kogutavad andmed</h1>
        <p>
          Ettevõte töötleb Kasutajate andmeid, mida Kasutajad on vabatahtlikult
          Ettevõttele Veebilehel avaldanud. Andmete avaldamata jätmise või
          kustutamise korral ei saa Kasutajad kasutada Veebilehte ning seal
          pakutavaid teenuseid.
          <br />
          Ettevõte kogub ja töötleb Kasutajate kohta järgmisi andmeid (edaspidi
          Isikuandmed):
        </p>
        <ul className="list-disc eula-li-styles">
          <li>Nimi, telefoninumber ja e-mail;</li>
          <li>Ettevõttenimi, -registrikood, -telefoninumber, - e-mail;</li>
          <li>Profiilipilt, logo</li>
          <li>Krediitkaardiandmed teenuse eest tasumiseks;</li>
          <li>Geograafilise asukoha andmed;</li>
          <li>
            Andmed seoses Kasutajate tegevusega Veebilehel ja teenuste
            kasutamisega;
          </li>
          <li>
            Muud andmed, mis on vajalikud kliendiuuringuteks ja pakkumisteks;
          </li>
          <li>
            Muud andmed, mida Kasutaja Veebilehel enda kohta avaldab (sugu,
            vanus jms).
          </li>
        </ul>
        <h1 className="eula-header">Isikuandmete kasutamine</h1>
        <p>
          Ettevõte töötleb Isikuandmeid üksnes seaduses või käesolevates
          privaatsustingimustes sätestatud eesmärkidel, mh Kasutajale
          kasutajakonto loomiseks, Kasutaja identifitseerimiseks ning Kasutajaga
          kontakteerumiseks, platvormiteenuse osutamiseks ja tugiteenuste
          pakkumiseks (sh kasutajatoe pakkumiseks), samuti seadusest tulenevate
          kohustuste täitmiseks.
          <br />
          Isikuandmeid töödeldakse Kasutaja ja Ettevõtte vahel sõlmitud lepingu
          alusel selle jaoks, et Kasutajale oleks võimalik vahendada Veebilehe
          kaudu teenuseid ja luua Veebilehele juurdepääs. Isikuandmeid, mis ei
          ole vältimatult vajalikud Veebilehe vahendusel teenuse osutamiseks,
          kuid mida Kasutaja on otsustanud vabatahtlikult avaldada (nt
          profiilipilt) töödeldakse nõusoleku alusel.
        </p>
        <h1 className="eula-header">
          Isikuandmete edastamine kolmandatele isikutele{' '}
        </h1>
        <p>
          Ettevõte võib edastada Isikuandmeid kolmandatele isikutele ja
          koostööpartneritele, kes osutavad Ettevõttele teenuseid, mis on
          vajalikud Veebilehe kaudu Kasutajale teenuse osutamiseks. Kolmandaid
          isikuid ja koostööpartnereid on teavitatud sellest, et nad võivad
          Isikuandmeid kasutada üksnes Ettevõtte poolt määratud eesmärgil ja
          ulatuses.
          <br />
          Ettevõte kasutab igapäevaseks tegevuseks kolmandaid isikuid, kes
          pakuvad:
        </p>
        <ul className="list-disc eula-li-styles">
          <li>e-mailide edastamise ja haldamise süsteemi;</li>
          <li>veebilehe majutust; veebilehe kasutusstatistika analüüsi;</li>
          <li>veebilehe ja rakenduse arendus, programmeerimine;</li>
          <li>
            reklaami- ja kommunikatsiooniga seotud teenuseid, sh meedia
            planeerimine ja -vahendus ning edastamine, turunduskampaaniate
            väljatöötamine ning läbiviimine
          </li>
        </ul>
        <h1 className="eula-header">Isikuandmete säilitamine ja turvalisus</h1>
        <p>
          Ettevõte säilitab Isikuandmeid nii kaua, kuni see on seadusega
          ettenähtud või lubatud, kuid mitte kauem, kui see on Ettevõttele
          vajalik eesmärkide saavutamiseks, milleks andmeid koguti või töödeldi.
          <br />
          Ettevõte rakendab kõiki mõistlikke meetmeid töödeldavate Isikuandmete
          kaitseks. Juurdepääs Isikuandmete muutmiseks ja töötlemiseks on ainult
          selleks volitatud isikutel ning Isikuandmeid käsitletakse kui
          konfidentsiaalset informatsiooni.
        </p>
        <h1 className="eula-header">Kasutaja õigused</h1>
        <p>Kasutajal on õigus igal ajal:</p>
        <ul className="list-disc eula-li-styles">
          <li>avaldada soovi juurdepääsuks enda andmetele;</li>
          <li>
            nõuda enda Isikuandmete parandamist, täiendamist või seaduses
            ettenähtud tingimustel kustutamist;
          </li>
          <li>nõuda enda Isikuandmete töötlemise piiramist;</li>
        </ul>
        <p>
          nõuda enda Isikuandmete ülekandmist. Oma õiguste kasutamiseks tuleb
          Kasutajal saata e-posti aadressile XXXX@XXX.com vastavasisuline
          sooviavaldus. Kui Kasutaja leiab, et tema õigusi on Isikuandmete
          töötlemisel rikutud, on tal õigus pöörduda Andmekaitse Inspektsiooni
          poole.
        </p>
        <h1 className="eula-header">Otseturustusteated</h1>
        <ul className="list-disc eula-li-styles">
          <li>
            Kasutame e-kirja aadressi ja/või telefoninumbrit isikustatud
            otseturustusteadete saatmiseks, kui olete andnud vastava nõusoleku
            Veebilehel.
          </li>
          <li>
            Kui Kasutaja ei soovi saada isikustatud otseturustusteateid, siis on
            võimalik valida e-kirja jaluses link „ei soovi saada
            otseturustusteateid“ või teha vastav märge Veebilehel.
          </li>
        </ul>
        <h1 className="eula-header">Küpsised</h1>
        <p>
          Küpsis on väike tekstifail, mille veebilehitseja automaatselt Kasutaja
          poolt kasutatavasse seadmesse salvestab. Küpsised võivad olla loodud
          erinevate teenusepakkujate poolt, näiteks Google ja Facebook.
          <br />
          Kasutades Veebilehte, nõustub Kasutaja küpsiste kasutamisega
          käesolevas korras kirjeldatud viisil.
        </p>
        <p>Küpsiseid on kahte tüüpi:</p>
        <ol className="list-decimal eula-li-styles">
          <li>
            Püsivad küpsised, mis jäävad Kasutaja seadmes olevasse küpsiste
            faili püsivalt. Neid võidakse kasutada näiteks Kasutaja kui
            Veebilehe korduvkülastaja äratundmiseks ja Veebilehe sisu
            kohandamiseks vastavalt Kasutaja vajadustele või statistiliste
            andmete kogumiseks.
          </li>
          <li>
            Seansiküpsised on ajutised ja kaovad, kui Kasutaja Veebilehelt
            lahkub või oma veebilehitseja sulgeb. Seansiküpsiseid võidakse
            kasutada Veebilehe teatud funktsioonide, näiteks teenuse või toote
            taotlemise jms võimaldamiseks.
          </li>
        </ol>
        <p>
          Küpsiseid kasutatakse Veebilehel teabe kogumiseks selle kohta, kuidas
          Veebilehte kasutatakse, et seda kasutajatele isiklikumaks ja
          kasutajasõbralikumaks muuta. Lisaks aitavad küpsised koguda
          kasutajastatistikat, mis võimaldab mõõta ja parandada Veebilehe
          toimivust ning annab alusandmed, et viia läbi efektiivne
          turundustegevus.
          <br />
          Kasutaja võib oma seadmes küpsiste kasutamise ära keelata või need
          kustutada, muutes oma veebilehitseja vastavaid seadeid. Küpsiste
          mittekasutamisel ei pruugi Veebileht korrektselt töötada.
        </p>
        <h1 className="eula-header">Privaatsustingimuste muutmine</h1>
        <br />
        <p>
          Ettevõte jätab endale õiguse muuta privaatsustingimusi ühepoolselt ja
          ette teatamata. Privaatsustingimused oma uusimas versioonis
          avalikustatakse veebil ehel ning muutmisest teavitatakse Kasutajaid.
          <br />
          Kõigi privaatsustingimuste ja andmetöötluse kohta tekkivate
          küsimustega palume võtta meiega ühendust e-posti aadressil
          XXX@XXX.com.
        </p>
      </div>
    </Layout>
  );
};

export default withRouter(Eula);
