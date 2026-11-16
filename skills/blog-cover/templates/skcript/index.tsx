import { Bar, Stage, Text, Window } from '../../kit'
import './look.css'

// TEMPLATE. Copy this folder to examples/cover-<slug>/, then in the copy:
// - import '../cover-_template/look.css' (shared, never edited) and your own './cover.css'
// - rename the root class `cv-tpl` to `cv-<3-5 letter code>` unique to the slug,
//   and nest EVERY selector under it (the preview loads all examples' CSS at once)
// - keep <Stage width={640} height={360} className="skc ...">; add theme="dark"
//   for the dark field or the class skc-paper for warm paper
// Film: see COVERS.md. Real words 15px+ (shown at 0.6x), 3 to 7 of them.

export default function CoverTemplate() {
  return (
    <Stage width={640} height={360} className="skc cv-tpl">
      {() => (
        <Window title="Title" className="cv-tpl-win">
          <div className="cv-tpl-body">
            <Text className="cv-tpl-focus">The one thing the post is about</Text>
            <Bar w={220} h={10} r={5} tone={2} />
            <Bar w={160} h={10} r={5} tone={2} />
          </div>
        </Window>
      )}
    </Stage>
  )
}
