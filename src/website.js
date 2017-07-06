import { Morph, Image, TilingLayout, StyleRules,
         morph, VerticalLayout, HTMLMorph, HorizontalLayout,
         Icon} from 'lively.morphic';
import {pt, rect, Color, LinearGradient, RadialGradient} from  'lively.graphics';
import {connect, signal} from 'lively.bindings';
import { arr } from 'lively.lang';

const pfx = '/hornung/', duration = 300, easing = Expo.easeOut;

const bio = [
 `Ludwig Hornung begann seine Ausbildung sechsjährig mit klassischen Klavierstunden und Schlagzeugunterricht, in den anschließenden Jahren folgten zweite und erste Preise bei „Jugend musiziert“ und „Jugend jazzt“. `,
`Parallel dazu interessierte sich Ludwig Hornung für elektronische Musikstile wie Trip Hop, Hip Hop und Breakbeat und begann im Alter von 14 Jahren, Beats und Remixes mit DJs aus dem Rhein-Main-Gebiet zu produzieren, gastierte mit diesen bei Konzerten im süddeutschen Raum und war an der Entstehung des ersten Albums des Elektro-Duos „Third I Vision“ beteiligt, welches auch in Japan auf den Markt kam. Von 2005 bis 2006 war Ludwig Hornung Mitglied des "Jugend Jazz Orchester Rheinland-Pfalz", mit dem er mehrere Konzert- und Auslands-Tourneen unternahm.`,
`2006 begann er ein Studium als Diplommusiker im Bereich Jazz-Klavier an der Musikhochschule Stuttgart bei Prof. Paul Schwarz. Während dieser Zeit in Stuttgart war er Mitglied der Backingband „Soulfood International", mit der er namhafte Raggae-Musiker wie Rico Rodriguez, Derrick Morgan, Alton Ellis bei Konzerten, Festivals und Tourneen in ganz Europa begleitete.2008 wechselte er dann an das Jazz Institut Berlin zu Prof. Wolfgang Köhler, Prof. David Friedman und Prof. Hubert Nuss, wo er im Juli 2011 sein Bachelor-Studium mit Bestnote abschloss. Parallel zum Jazz-Studium bekam Ludwig Hornung klassischen Klavierunterricht bei Prof. Susanne Grützmann. `,`Mit dem Dima Bondarev Quintett trat er beim Wettberwerb des Festivals „Jazz à Montauban“ in Frankreich auf, wo die Gruppe den ersten Preis gewann, einen zweiten Preis gab es auf dem „Jazz nad Odra“-Festival in Polen, Tourneen führten unter anderem auf das Festival „Jazz Bez“ in L‘viv (Ukraine), wo es zu einem gemeinsamen Fernsehauftritt mit dem Bandleader kam.Weitere Festivals auf denen Hornung auftrat waren die „Jazzopen Stuttgart“, „German Jazz Nights“ in Brüssel, „Jazz Festival Lyon“ und das „Jazznachwuchsfestival Leipzig“.`,`Seine Hauptaktivitäten in den letzten Jahren waren vor allem die Gründung zweier eigener Projekte: das akkustische „Hornung Trio“ mit Phil Donkin am Bass und Bernd Oezsevim am Schlagzeug, dessen erste CD „Spieler“ im Juli 2017 bei der rennomierten Reihe „Jazz thing - Next Generation“ erscheint, sowie die Combo „Triebwerk Hornung“, bestehend aus Saxophon, Schlagzeug und Fender Rhodes, zusammen mit Wanja Slavin und John Schröder, die Debut-CD erschien im November 2017 bei dem schweizer Label „Unit Records“.In beiden Bands werden ausschließlich  Eigenkompositionen gespielt, da das Komponieren für Ludwig Hornung seit seiner Jugend einen großen Stellenwert einnimmt.`,`In Berlin organisiert er seit 2012 eine wöchentliche Session („Bei Ernst“), die er mit wechselnden Musikern der Berliner Jazz-Szene eröffnet`,`Er spielte und konzertierte unter anderem mit Jan Leipnitz, John Schröder, Tobias Backhaus, Sebastian Merk, Mathias Ruppnig, Ivars Arutyunyan, Moritz Baumgärtner, Phil Donkin, Andreas Lang, Josh Ginsburg, Johannes Fink, Rodolfo Paccapelo, Max Mucha, Marc Muellbauer, Wanja Slavin, Felix Wahnschaffe, Finn Wiesner, Uli Kempendorff, Malte Schiller, Ben Kraef, Ronny Graupe, Paulo Cardoso, Diego Pinera, Tony Lakatos, Peter Ehwald u. v. a.`,`Seine musikalischen Tätigkeiten führten ihn nach Frankreich, Dänemark, Italien, Portugal, Schweden, Belgien, Tschechien, Russland, Polen, Bulgarien, Österreich, Süd-Korea, in die Schweiz, die Ukraine, die Niederlande, die Türkei und in die USA.2017 erhielt Ludwig Hornung ein Stipendium des Berliner Senats.`], reference = [
 `Ludwig Hornung ist einer der wenigen Menschen, die mit einer natürlichen Virtuosität gesegnet sind. Seine Technik ist nichts weniger als atemberaubend!`,
`Und mit „Technik“ meine ich nicht in erster Linie schnell und viel spielen können –das können die meisten-  sondern die einzigartige singende Qualität jedes Tones zu erzeugen und in jedem denkbaren Kontext aufrecht zu erhalten. Alles singt bei ihm, die rasenden Linien nehmen einen Ton für Ton gefangen („Echos“), die Akkorde leuchten geradezu („Der Spieler“).`,
`Wer so singen kann, der hört jeden Ton, den er spielt, der ist ganz und gar im Moment, der ist mit jeder Note glaubwürdig und jede Improvisation wird zur spontanen Komposition,
der am Ende nichts mehr hinzuzufügen ist. Es ist müßig, auf einzelne Stücke oder Stellen zu verweisen, denn Ludwig Hornungs Souveränität ist omnipräsent.`,
`Er beherrscht die Musik und das Instrument nach Belieben und wir folgen seinen spontanen Reisen durch Eigenkompositionen und Standards der Meister (Monk’s „Ugly Beauty“, und „Kokolores“ ist natürlich eine Verneigung vor Wayne Shorter’s „Dolores“), fasziniert an jeder Note hängend, gespannt wohin die Reise geht, fast schon enttäuscht, wenn das Stück zu Ende ist.
Ich könnte ihm stundenlang zuhören!`
 ],
 termine = [
[],
['11.2.', 'Triebwerk Hornung', 'Donau 115', 'Berlin'],
["10.2.", "Hornung/Leipnitz/Paccapelo", "Jam Session bei Ernst", "Berlin"],
["17.2.", "Kaiser/Grütter/Hornung", "Cafe Sur", "Berlin"],
["18.2.", "Kaiser/Grütter/Hornung @ Jazz on the roof", "Café Haberland", "Berlin"],
["24.2.", "Hornung/Leipnitz/Paccapelo", "Jam Session bei Ernst", "Berlin"],
["11.3,", "Slavin/Hornung/Henkelhausen/Ruppnig", "Late Night Session im A-Trane", "Berlin"],
["17.3.", "Hornung/Leipnitz/Paccapelo", "Jam Session bei Ernst", "Berlin"],
["6.4.", "Triebwerk Hornung", "B-Flat", "Berlin"],
["7.4.", "Hornung/Leipnitz/Paccapelo", "Jam Session bei Ernst", "Berlin"],
["18.4.", "Dima Bondarev Quintet", "B-Flat", "Berlin"],
["27.4.", "Kraef/Hornung/Ginsburg/Arutyunyan", "Donau115", "Berlin" ],
["28.4.","Hornung/Leipnitz/Paccapelo", "Jam Session bei Ernst", "Berlin"],
["29.4.","Hornung/Jensen/Arutyunyan", "Late Night Session im A Trane", "Berlin"],
["6.5.",  "Hornung/Berkmann/Rupnig", "Donau115", "Berlin"],
["19.5.", "Triebwerk Hornung", "Jazzclub Rostock", "Rostock"],
["28.5.", "Triebwerk Hornung", "Jazz im Gut", 'Hannover'],
["2.6.", "Hornung/Leipnitz/Paccapelo", "Jam Session bei Ernst", "Berlin"],
["3.6.", "Hornung/Santner/Arutyunyan", "Late Night Session im A-Trane", "Berlin"],
['27.6.', 'Niklas Lukassen Quintet', 'A Trane', 'Berlin'],
['28.6.', 'Niklas Lukassen Quintet', 'A Trane', 'Berlin'],
['30.6.', "Hornung/Leipnitz/Paccapelo", "Jam Session bei Ernst", "Berlin"],
['8.7.', 'Hornung Trio', 'Donau 115', 'Berlin'],
['23.7.', 'Niklas Lukassen Quintet', 'Schlot', "Berlin"],
[]
 ].map(([date, name, place, city]) => {return {date, name, place, city}}),

 triebwerkVideos = ["https://www.youtube.com/v/8jeVxQ-qtEo", "https://www.youtube.com/v/d3QHnxEcu1o"],

 trioVideos = ["https://www.youtube.com/v/X8fYqMmwDiE", "https://www.youtube.com/v/MXtZUFel7VE"],

 trioDescription = [`Das Hornung Trio, dessen erste CD imAugust 2017 bei der rennomierten Reihe „Jazz thing - Next Generation“ veröffentlicht werden wird, hat viele Gesichter. Mal wild, mal lyrisch, mal frei spielend, mal rhythmische Gerüste auslotend, jedoch immer intensiv und um ein Höchstmaß an Kommunikation bemüht, interpretieren die drei Musiker die Kompositionen des Pianisten mit viel Energie und Verve.Diese bestehen zum Teil aus einfachen Melodien und geben den Musikern viel Raum und die Möglichkeit, ihre jeweiligen eigenen Stimmen zu einem homogenen Gemisch zusammenwachsen zu lassen, im Vordergrund steht das Bestreben, ausdrucksstark und mit hohem innerem Engagement zu agieren.Wer von Musik nicht nur eingelullt, sondern auch mal gefordert werden möchte, kommt hier voll und ganz auf seine Kosten.`,
 `Ludwig Hornung - Piano, Kompositionen`,
  `Phil Donkin - Bass`,
  `Bernd Oezsevim - Schlagzeug`],

  triebwerkDescription = [`Wanja Slavin, John Schröder und Ludwig Hornung bilden das „Triebwerk“, dessen Bestreben es ist, stets ein hohes Maß an Energie, Abwechslungsreichtum und Dichte zu erreichen, was durch die intime Bestzung unterstützt, beziehungsweise forciert wird. Überbordende, ausladende Passagen haben ebenso eine Daseinsberechtigung wie lyrische und fragile Momente; die Kommunikation untereinander steht über Allem. Stilistisch dem Jazz verschrieben, finden sich Elemente des Rock, des Drum and Bass sowie der Freien Musik zusammen zu einem homogenen Gemisch, das den Hörer mal fordert, mal einlullt, jedoch nie langweilt.In John Schröder, längst einer der wichtigsten, versiertesten und einflußreichsten Musiker der deutschen Jazzszene, und Wanja Slavin, Innovator und festes Bestandteil des deutschen Jazzgeschehens, fand Initiator und Spiritus rector Ludwig Hornung die geeigneten Weggenossen, seine Klangvortsellungen umzusetzen.`],

 jazzthing = [`Eine nicht so ganz übliche Besetzung bildet das Trio Ludwig Hornung, Wanja Slavin und John Schröder mit Fender Rhodes, Saxofon und Schlagzeug. Doch die erweist sich bei diesem Debüt als genau die richtige Triebfeder für ihre sehr direkte, vorwärtstreibende Musik. Hier wird nicht nur voller Energie und Lust ausgelassen frei improvisiert, sondern Kommunikation in allen Facetten betrieben. Hornung haut oft kraftvoll rockig oder mal funky in die Tasten, entlockt seinem elektrischen Klavier aber auch zarteste Noten, zu denen Slavin lyrische Passagen spielt und Schröder mal verträumt mal enorm rhythmisch Felle und Becken bearbeitet. Diese Musik ist derart intensiv und den so erzeugten Druck spürt man fast körperlich. Dann gibt es nach fast sechzig Minuten Powerplay noch einen ziemlich lustigen Hidden Track, bei dem in wunderbar satirisch überspitzten Dialogen der zwischenmenschliche Alltagswahnsinn kolportiert wird. Grandios!`],

 podium = [`Die Idee zu dieser Band gab es schon sehr lange, jetzt liegt endlich die erste CD von Ludwig Hornung (Fender Rhodes), Wanja Slavin (Saxofon) und John Schröder (Drums) vor. Ein Motor für die Entscheidung, das zu Unrecht in den letzten Jahren zumindest im Jazz wenig präsente Fender Rhodes wieder etwas in den Vordergrund zu rücken, war dabei zweifelsohne der innovative Umgang von Ludwig Hornung mit diesem Instrument. Und es gehörte wohl auch etwas Mut dazu, dieses E-Piano mit dem ganz speziellen warmen, glockenähnlichen Klang, das in Jazz, Funk, Soul und Fusion ab Ende der 1960er- bis Mitte der 1980er-Jahre stilprägend war, wieder zu emanzipieren. Triebwerk Hornung beweist einmal mehr: Die ganz und gar eigenständige Klangfarbe des Fender Rhodes bleibt aktuell und faszinierend, trotz aller digitalen Neuerungen, und korrespondiert problemlos mit den breit angelegten Saxofonpassagen Wanja Slavins und John Schröders raffinierten, sorgfältig austarierten Drum-Eskapaden. Das Ergebnis ist eine überraschende, spannungsgeladene Musik zwischen Retro und Moderne. Höhepunkte sind immer wieder die Zwiegespräche zwischen Ludwig Hornung und seinen kongenialen Partnern.`],

 triebwerkTunes = [
    `<iframe width="100%" height="100" scrolling="no" frameborder="no"
      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/240710643&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>`,
    `<iframe width="100%" height="100" scrolling="no" frameborder="no"
      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/240710531&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>`,
 ],

 trioTunes = [
   `<iframe width="100%" height="100" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/240706961&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>`,
   `<iframe width="100%" height="100" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/240706870&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>`];

async function fitToContainer(container, background, animated) {
      var ext = background._natExt = background._natExt ||  await background.naturalExtent(),
          {width, height} = pt(0,0).extent(ext).scaleRectIn(container.innerBounds()),
          extent = ext.scaleBy(1 / Math.min(width, height)),
          center = container.innerBounds().center(),
          bounds = pt(0,0).extent(extent).withCenter(center);
      if (animated) {
         await background.animate({bounds, duration, easing});
      } else {
         background.setBounds(bounds);
      }
   }

async function fitToContainerHeight(container, background) {
  var ext = background._natExt = background._natExt ||  await background.naturalExtent(),
      {width, height} = pt(0,0).extent(ext).scaleRectIn(container.innerBounds()),
      extent = ext.scaleBy(1 / height),
      center = container.innerBounds().center(),
      bounds = pt(0,0).extent(extent).withCenter(center);
     background.setBounds(bounds);
}

function renderParagraph(p) {
  return `<p style="color: rgba(255,255,255,1); font-family: Libre Franklin, sans-serif;">`
                   + p.join(`</p><p style="color: rgba(255,255,255,1); font-family: Libre Franklin, sans-serif;">`) + '</p>';
}

export class Website extends Morph {

   constructor(props) {
      super({
        name: "Website",
        extent: $world.extent, fill: Color.transparent,
         ...props,
          submorphs: [
             {type: "image", name: 'bodyBackground'},
             {fill: Color.transparent,
              name: 'pageTitle',
              layout: new VerticalLayout(),
              position: pt(20,20),
              submorphs: [
                {type: 'text', textString: 'Ludwig Hornung', width: 400, fixedWidth: true,  morphClasses: ['pageTitle']},
                {type: "text", textString: "Pianist, Komponist", name: 'subTitle', width: 300, fixedWidth: true}]},
             {name: 'zitat', opacity: 0,
              hide() { this.animate({opacity: 0, duration})},
              submorphs: [{type: "label",
                  value: `"Ludwig Hornung ist einer der wenigen Menschen,
die mit einer natürlichen Virtuosität gesegnet sind.
Alles singt bei ihm."`, morphClasses: ['quote']},
{type: "label", value: "Hubert Nuss", morphClasses: ['reference']}]},
             new Body({extent: $world.extent, name: "body"})

         ]
      });
      this.styleRules = this.styler;
      connect($world, 'extent', this, 'relayout');
      $world.clipMode = "hidden";
      this.relayout();
      this.whenRendered().then(() => this.relayout());
      this.startStepping(1000, "relayout")
      setTimeout(async () => {
         $world.env.fontMetric.reset();
         $world.withAllSubmorphsDo(ea => {
             ea.fit && ea.textLayout && ea.textLayout.reset();
             ea.fit && ea.fit();
             })
         this.get('zitat').bottomLeft = this.innerBounds().center().addXY(200, -200);
;
         await this.get('zitat').animate({opacity: 1});
       }, 1000);
   }

   get styler() {
      return new StyleRules({
          presse: {fill: Color.black.withA(.7), borderRadius: 10},
          titleBio: {fontColor: Color.gray.lighter(), fontSize: 20, padding: 20,
                     width: 500, fontFamily: "Libre Franklin", fontWeight: '400'},
          projectTitle: {fontColor: Color.white, fontSize: 50, padding: 20, fixedWidth: true, width: 500,
                         fontWeight: 'bold', fontFamily: "Libre Franklin", fill: Color.transparent},
          zitat: {fill: Color.transparent, borderRadius: 10,
                  layout: new VerticalLayout({spacing: 10, resizeContainer: true})},
          quote: {fontColor: Color.gray.darker(), fontSize: 15,
                  fontStyle: 'italic', fontFamily: "Libre Franklin"},
          reference: {fontColor: Color.gray.darker(), fontSize: 15, fontFamily: "Libre Franklin"},
          close: {fontColor: Color.white, fontSize: 30, nativeCursor: "pointer"},
          tableCol: {fill: Color.transparent, position: pt(25,25),
                     clipMode: 'auto',
                     layout: new VerticalLayout({spacing: 20, resizeContainer: false})},
          termin: {fontSize: 30, fontColor: Color.gray.lighter(), fontFamily: "Libre Franklin"},
          horizontal: {fill: Color.transparent, layout: new HorizontalLayout({resizeContainer: true})},
          vertical: {fill: Color.transparent, layout: new VerticalLayout({resizeContainer: true})},
          category: {clipMode: 'hidden', fill: Color.transparent},
          body: {borderWidth: 0, clipMode: "hidden", fill: Color.transparent,
                 borderColor: Color.gray.darker()},
          bodyBackground: {imageUrl: pfx + 'Seiteguck.png', fill: Color.transparent},
          pageTitle: {fontSize: 50, fill: Color.transparent,
                       fontFamily: "Libre Franklin",
                      fontColor: Color.black},
          subTitle: {fontSize: 20, fontFamily: 'Libre Franklin', fixedWidth: true,  width: 300,
                     fontColor: Color.black, bottomLeft: pt(10, 50), fill: Color.transparent},
          mediaBackground: {fill: new LinearGradient({stops: [{color: Color.transparent, offset: 0}, {color: Color.black, offset: 1}]}),
                  clipMode: "hidden"},
          titleLabel: {readOnly: true, nativeCursor: 'pointer',
              fontSize: 28, fontWeight: '400', readOnly: true,
              fontColor: Color.black, opacity: 1, fontFamily: 'Libre Franklin',
              fill: Color.transparent}
      })
   }

   relayout() {
       const zitat = this.get('zitat'),
            body = this.get('body'),
            title = this.get('pageTitle');
      $world.fill = new RadialGradient({
        bounds: $world.innerBounds(),
        focus: pt(.5,.5),
        stops: [
         {offset: .6, color: Color.white},
         {offset: 1, color: Color.gray}]})
       this.extent = $world.extent;
       this.position = pt(0,0)
       body.extent = this.extent;
       body.relayout();
       zitat.submorphs.forEach(m => m.fit());
       var delta = this.innerBounds().topRight().subPt(this.innerBounds().center())
       zitat.bottomLeft = this.innerBounds().center().addPt(delta.scaleByPt(pt(.3, .5)));
       body.position = pt(0,0);
       title.position = pt(20,20);
       fitToContainerHeight(this, this.get('bodyBackground'))
       this.get('bodyBackground').topCenter = this.innerBounds().topCenter();
       if ($world.firstHand) $world.firstHand.fill = Color.transparent;
   }

}


class Body extends Morph {

 // Termine, Projekte, Bio,
   constructor(props) {
        super({
           ...props,
           morphClasses: ['body'],
        })
        const categoryExtent = pt(250, 50),
              categories = [
                            this.renderBio(categoryExtent, pt(200, 300)),
                            this.renderTrio(categoryExtent, pt(200, 360)),
                            this.renderTriebwerk(categoryExtent, pt(200, 420)),
                            this.renderPresse(categoryExtent, pt(200, 480)),
                            this.renderSchedule(categoryExtent, pt(200, 540)),
                            this.renderContact(categoryExtent, pt(200, 600)),
                            this.renderCD(categoryExtent, pt(200, 660))]
        categories.forEach(m => {
           connect(m, 'expand', this, 'expand');
           connect(m, 'close', this, 'close');
        })
        this.submorphs = this.categories = categories;
   }

   relayout() {
      if (this.expandedCategory) this.expand(this.expandedCategory);
   }

   async expand(category) {
      if (category.extent.equals(this.extent)) return;
      console.log('expading', category)
      this.expandedCategory = category;
      this.layout = null;
      this.categories
          .filter(c => c != category)
          .map(c => {
         c.shrinkTo(pt(250, 50));
         c.visible = false;
         return c;
      });
      category.expandTo(pt(this.width, this.height));
      await category.animate({position: pt(0,0), duration, easing});
      category.content.withAllSubmorphsDo(m => m.relayout && m.relayout());
   }

   close(category) {
      if (this.expandedCategory == category) {
         this.expandedCategory = null;
         this.categories
             .map(c => {
            c.visible = true;
            c.shrinkTo(pt(250,50));
            return c;
         });
      }
   }

   renderPresse(extent, position) {
     const zeitungContainer = morph({
     fill: Color.transparent,
     submorphs: [{
           type: 'image',
           imageUrl: pfx + 'page_42.png',
           name: 'zeitung',
           onHoverIn() {
              this.animate({scale: 1.8});
           },
           onHoverOut() {
              this.animate({scale: 1});
           }
        }, {
            type: "text", fill: Color.transparent,
            fontSize: 25, fontFamily: "Libre Franklin",
            fontColor: Color.gray.lighter(),
            position: pt(0, -40),
            textString: "Concerto, 02/17"}]}),
           jt = morph({type: 'html',
                  position: pt(100,100),
                  fill: Color.transparent,
                  html: renderParagraph(jazzthing),
                  width: 600, submorphs: [{
                      type: "text", fill: Color.transparent,
                      fontSize: 25, fontFamily: "Libre Franklin",
                      fontColor: Color.gray.lighter(),
                      position: pt(0, -40),
                      textString: "Jazz thing, 02/17"}]}),
            p = morph({type: 'html',
                  position: pt(100,450),
                  fill: Color.transparent,
                  html: renderParagraph(podium),
                  width: 600, submorphs: [{
                      type: "text", fill: Color.transparent,
                      fontSize: 25, fontFamily: "Libre Franklin",
                      fontColor: Color.gray.lighter(),
                      position: pt(0, -40),
                      textString: "Jazzpodium, 02/17"}]});

     (async () => {
        const zeitung = zeitungContainer.get('zeitung');
        zeitung.extent = (await zeitung.naturalExtent()).scaleBy(.25);
        zeitung.topLeft = pt(0,0);
        zeitungContainer.topRight = this.innerBounds().insetByPt(pt(100,50)).topRight();
        zeitung.origin = zeitung.extent
        zeitung.moveBy(zeitung.origin);
     })()

     return new Category({
        position, extent,
        title: 'Presse',
        background: morph({
          type: 'image',
          imageUrl: pfx + 'portrait.png'
        }),
        content: morph({fill: Color.transparent,
        submorphs: [zeitungContainer, jt, p]})
        })
   }

   renderBio(extent, position) {
       const self = this,
             content = morph({
          fill: Color.transparent,
          layout: new VerticalLayout({resizeContainer: true}),
          relayout() {
             this.submorphs.forEach(t => t.relayout());
             this.position = pt(0,20)
          },
          submorphs: [{
            relayout() {
               this.height = this.get('bio').domNode.scrollHeight + 60;
               this.width = $world.visibleBounds().width - 50;
               this.submorphs[0].width = this.width - 50;
            }, width: 1000,
            fill: Color.transparent,
            submorphs: [{
             name: 'bio',
             type: 'html',
             extent: pt(1000, 650), draggable: false, position: pt(25,25),
             html: renderParagraph(bio),
                   fill: Color.transparent
      }]},{morphClasses: ['vertical'],
           relayout() { this.submorphs.forEach(m => m.relayout && m.relayout())},
           submorphs: [{
               type: 'label', morphClasses: ['titleBio'],
               value: `Hubert Nuss über die im August erscheinende CD\ndes "Hornung Trios":`}, { width: 600,
            fill: Color.transparent,
            submorphs: [{
             type: 'html',
             extent: pt(550, 700), draggable: false, position: pt(25,0),
             html: renderParagraph(reference),
                   fill: Color.transparent
      }]}]}]
       });
      connect(this, 'extent', content, 'relayout');
      return new Category({
         position,
         background: morph({
           type: 'image',
           imageUrl: pfx + 'portrait.png'
         }), extent,
         title: 'Biographie',
         content: morph({fill: Color.transparent, clipMode: 'scroll', submorphs: [content]})})
   }

   renderTriebwerk(extent, position) {
     const triebwerkYT = triebwerkVideos.map(src => this.renderYoutubeVideo(src)),
           triebwerkSC = triebwerkTunes.map(src => this.renderSoundCloudTune(src)),
           jt = morph({type: 'html',
                  fill: Color.transparent,
                  html: renderParagraph(jazzthing),
                  width: 600}),
            selector =  morph(({
                    position: pt(25,25),
                    labelStyle: {
                       fontSize: 20, fontWeight: 'plain',
                       fontFamily: "Libre Franklin",
                       fontColor: Color.gray},
                    markerStyle: {opacity: .7},
                    items: {
                       "Jazz thing, 02/17": renderParagraph(jazzthing),
                       "Jazzpodium, 02/17"
                       : renderParagraph(podium)
                    },
                    init: "Jazz thing, 02/17",
                })),
            pressHolder = morph({position: pt(20,50),
                            showArticle(article) {
                               this.submorphs[0].html = article;
                            },
                            submorphs: [jt],
                            fill: Color.transparent}),
            content = morph({
               fill: Color.transparent, visible: false,
               async updateExtent(ext) {
                  const media = this.get('media'),
                        bg = this.get('mediaBackground'),
                        tunes = this.get('tunes');
                  this.extent = ext;
                  bg.extent = ext;
                  await fitToContainer(this, this.get('triebwerk-background'));
                  this.get('triebwerk-background').topCenter = this.innerBounds().topCenter();
                  media.extent = ext.addXY(0, -100);
                  tunes.extent = pt(700, 300);
                  media.position = pt(50, 600);
               },
               submorphs: [
               {name: 'triebwerk-background', type: 'image', imageUrl: pfx + 'triebwerk.jpg', extent},
               {name: 'mediaBackground'},
               {type: 'text', textString: 'Triebwerk Hornung', morphClasses: ['projectTitle'],
                position: pt(25,30)},
               {fill: Color.transparent, width: 400, height: 500, position: pt(25,100),
                submorphs: [{type: 'html',
                  position: pt(25,25),
                  fill: Color.transparent,
                  html: renderParagraph(triebwerkDescription),
                  width: 350}]},
               {name: 'media', clipMode: 'scroll', morphClasses: ['presse'],
                submorphs: [
                {fill: Color.transparent, layout: new HorizontalLayout({spacing: 10}),
                 submorphs:[
                   {fill: Color.transparent,
                    layout: new HorizontalLayout({spacing: 10}),
                    submorphs: triebwerkYT},
                   {fill: Color.transparent, name: 'tunes',
                    layout: new TilingLayout({spacing: 20}),
                   submorphs: triebwerkSC}
                   ]}]}]}),
               c = new Category({
                position,
                background: morph({type: 'image', imageUrl: pfx + 'trio.png'}),
                title: 'Triebwerk', extent,
                content});
       connect(c, 'extent', content, 'updateExtent');
       return c;
   }

   renderTrio(extent, position) {
      const trioSC = trioTunes.map(src => this.renderSoundCloudTune(src)),
            trioYT = trioVideos.map(src => this.renderYoutubeVideo(src)),
            content = morph({
          fill: Color.transparent, visible: false,
          updateExtent(ext) {
              const media = this.get('media'),
                    bg = this.get('mediaBackground'),
                    info = this.get('infoText');
              this.extent = ext;
              bg.extent = ext;
              fitToContainer(this, this.get('trio-background'));
              media.extent = ext.addXY(0, -100);
              media.position = pt(50, 600);
              this.get('projectTitle').position = pt($world.width * .6, 30);
              info.position = pt($world.width * .6, 120);
           },
          submorphs: [
          {name: 'trio-background', type: 'image', imageUrl: pfx + 'trio.jpg', extent},
          {name: 'mediaBackground'},
          {type: 'text', value: 'Hornung Trio',
           name: 'projectTitle', position: pt($world.width * .6, 30)},
          {fill: Color.transparent, name: 'infoText',
              position: pt($world.width * .6, 100),
              submorphs: [{
              morphClasses: ['presse'],
              width: 400, height: 450,
              submorphs: [{
                 position: pt(20,0),
                 type: 'html', html: renderParagraph(trioDescription),
                 fill: Color.transparent
                 }]}]},
          {name: 'media', clipMode: 'scroll', morphClasses: ['presse'],
           submorphs: [{fill: Color.transparent, layout: new HorizontalLayout({spacing: 10}), submorphs:
            [
             {fill: Color.transparent,
              layout: new HorizontalLayout({spacing: 10}),
              submorphs: trioYT},
              {fill: Color.transparent,
              layout: new HorizontalLayout({spacing: 10}),
               submorphs: trioSC}]}]},
          ]
     }),
     c = new Category({
                position,
                background: morph({type: 'image', imageUrl: pfx + 'trio.png'}),
                title: 'Trio', extent,
                content});
     connect(c, "extent", content, "updateExtent");
     return c;
   }

   renderSchedule(extent, position) {
      const self = this,
            content = morph({
            morphClasses: ['tableCol'],
             relayoutConcerts() {
               this.width = 900
                this.height = $world.visibleBounds().height;
                this.center = self.center;
             },
             submorphs: termine.reverse().map(({date, name, place, city}) => {
                 return {fill: Color.transparent,
                         layout: new HorizontalLayout(),
                         submorphs: [
                            {type: 'text', fill: Color.transparent, textString: date, fontFamily: "Libre Franklin",
                            width: 80, fontWeight: 'bold', fontColor: Color.gray, fontSize: 18, padding: 5, fixedWidth: true},
                            {type: 'text', fill: Color.transparent, textString: name, fontStyle: 'italic', fontSize: 18,
                            width: 400, fontFamily: "Libre Franklin", fontColor: Color.gray, padding: 5, fixedWidth: true},
                            {type: 'text', fill: Color.transparent, textString: place, fontFamily: "Libre Franklin",
                            width: 270,
                             fontColor: Color.white, fontSize: 18, padding: 5, fixedWidth: true,
                             nativeCursor: 'pointer', onMouseDown() {  }},
                             {type: 'text', fill: Color.transparent, textString: city, fontStyle: 'italic', fontSize: 18,
                             width: 400, fontFamily: "Libre Franklin", fontColor: Color.gray, padding: 5, fixedWidth: true}
                         ]}
             })
         });
      connect(content, 'extent', content, "relayoutConcerts");
      return new Category({
         position,
         clipMode: 'auto',
         background: morph({type: 'image',
            // reactsToPointer: false,
            imageUrl: pfx + 'Monnem.jpg'}),
         extent, title: 'Konzerte', content})
   }

   renderContact(extent, position) {
      const self = this,
            content = morph({
             relayout() {
                this.fit();
                this.center = self.center
             },
             fill: Color.transparent, fontFamily: "Libre Franklin",
             type: 'text', padding: 50, fontSize: 30, fontColor: Color.gray.lighter(),
             readOnly: true,
             textString:
`Ludwig Hornung\n
Wilhelmshavener Straße 59\n
10551 Berlin\n
ludwighornung ( at ) web.de\n`
         });
      connect(this, 'extent', content, 'relayout');
      return new Category({
         position,
         background: morph({type: 'image',
         imageUrl: pfx + 'belgien.jpg'}),
         extent, title: 'Kontakt', content})
   }

   renderCD(extent, position) {
      const self = this,
            content = morph({
             fill: Color.black.withA(.4),
             async relayout() {
                this.get('cover').extent = (await this.get('cover').naturalExtent()).scaleBy(.5)
                this.get('itunesLink').position = pt($world.width * .75, $world.height * .3);
                this.get('amazonLink').position = this.get('itunesLink').position.addXY(0,100);
             },
             submorphs: [{
                type: 'image', name: 'cover',
                position: pt(100,100),
                fadeIn() {
                   if (this.faded) return;
                   this.faded = true;
                   this.opacity = 0; this.scale = .8;
                   setTimeout(() => this.animate({opacity: 1, scale: 1}), 1000);
                },
                dropShadow: {blur: 60, distance: 11, color: Color.black},
                imageUrl: pfx + 'cover.jpg'
             },{
                 type: 'html', name: 'itunesLink', center: pt($world.width * .75, $world.height * .3),
                 fill: Color.transparent,
                 html: '<a href="https://geo.itunes.apple.com/us/album/triebwerk-hornung/id1170888829?mt=1&app=music" style="display:inline-block;overflow:hidden;background:url(//linkmaker.itunes.apple.com/assets/shared/badges/en-us/music-lrg.svg) no-repeat;width:110px;height:40px;background-size:contain;"></a>'
             },
             {
                 type: 'html', name: 'amazonLink', center: pt($world.width * .75, $world.height * .4),
                 fill: Color.transparent,
                 html: `<a href="https://www.amazon.de/Triebwerk-Hornung-UTR-4720/dp/B01NAB3TZ4/ref=tmm_acd_swatch_0?_encoding=UTF8&qid=1479816046&sr=8-1?_encoding=UTF8&camp=1789&creative=9325&linkCode=ur2&tag=storypodca-20&linkId=2P4S6EY6B462X4AR" target="_blank"><img src="http://www.niftybuttons.com/amazon/amazon-button2.png" alt="Amazon Button (via NiftyButtons.com)"></a>`
             }]
         });
      connect(this, 'extent', content, 'relayout');
      var c = new Category({
         position,
         background: morph({type: 'image',
         imageUrl: pfx + 'belgien.jpg'}),
         extent, title: 'CD', content});
      connect(c, 'expandTo', c.get("cover"), 'fadeIn');
      return c;
   }

   renderYoutubeVideo(src) {
      return new HTMLMorph({extent: pt(300, 150),
              html: `<object>
    <param name="movie" value="${src}"></param>
    <embed src="${src}" type="application/x-shockwave-flash"></embed>
</object>`})
   }

   renderSoundCloudTune(html) {
      return {type: 'html', extent: pt(300, 100), html}
   }

}

class Category extends Morph {

   constructor(props) {
      const {background, title, content, position} = props;
      super({
          ...props,
          initPos: position,
          morphClasses: ['category'],
          nativeCursor: 'pointer',
          submorphs: [
             {name: 'fader', fill: Color.black.withA(.7), opacity: 0, draggable: false},
             {type: 'label', value: title, position: pt(25,25),
              morphClasses: ['titleLabel'], name: "title"},
             Object.assign(content, {opacity: 0, name: 'content', visible: false}),
             {name: "closeButton",
              onMouseDown: () => {
                signal(this, 'close', this)
              },
              layout: new HorizontalLayout({spacing: 3}),
              opacity: 0, fill: Color.black.withA(.5),
              borderRadius: 5,
              submorphs: [
                Icon.makeLabel("arrow-left", {morphClasses: ['close']}),
                {type: 'label', value: 'Go Back', morphClasses: ['close']},
              ]}
          ]
      });
      this.relayout();
   }

   // onHoverIn() {
   //   if (this.expanded) return;
   //   this.get('title').animate({opacity: 1, duration, easing})
   // }
   //
   // onHoverOut() {
   //    if (this.expanded) return;
   //    this.get('title').animate({opacity: .7, duration, easing})
   // }

   onMouseDown(evt) {
      !this.expanded && signal(this, 'expand', this);
   }
   async fitBackground(animated) {
      return await fitToContainer(this, this.background, animated)
   }

   relayout(animated = false) {
      this.fitBackground(animated)
      this.get('fader').extent = this.extent;
      this.get('content').extent = this.extent;
      this.get('closeButton').topRight = this.innerBounds().insetBy(20).topRight();
      this.get('title').fit()
      this.get('title').position = pt(10,10)
   }

   async expandTo(extent) {
      this.expanded = true;
      this.get('title').animate({opacity: 0, visible: false, duration, easing})
      this.animate({extent, nativeCursor: "auto", duration, easing});
      this.get('content').animate({opacity: 1, visible: true, extent, duration, easing})
      this.get('closeButton').animate({
          opacity: 1, duration, easing,
          topRight: this.innerBounds().insetBy(20).topRight()});
      this.get('fader').animate({extent, opacity: 1, easing, duration});
      await this.fitBackground(true);
   }

   shrinkTo(extent) {
      this.expanded = false;
      this.get('title').animate({opacity: .7, visible: true, easing})
      this.get('fader').animate({extent, opacity: 0, easing, duration});
      this.animate({extent, position: this.initPos,
                    nativeCursor: 'pointer', duration, easing});
      this.fitBackground(true);
      this.get('closeButton').animate({
          opacity: 0, duration, easing,
          topRight: this.innerBounds().insetBy(20).topRight()});
      this.get('content').animate({opacity: 0, visible: false, extent, duration, easing})
   }
}
