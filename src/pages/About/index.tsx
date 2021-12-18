import style from "./style.module.css";
import { Section } from "@/components/components";

export const About = () => {
  return (
    <main
      className={style.container}
      style={{ background: `url(/assets/images/bg_5.jpg) no-repeat center center/cover` }}
    >
      <Section title="About" >
        <div className={style.sectionContainer}>
          <p>In our store you can find every game you want. We are leading game seller. We offer discount programm for our permanent clients. </p>
        </div>
      </Section>
    </main>
  );
};
