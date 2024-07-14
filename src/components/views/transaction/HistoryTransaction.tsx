import TitleHistory from "./TitleHistory";
import ContentHistory from "./ContentHistory";
import ContainerContent from "./ContainerContent";
import ContainerHistory from "./ContainerHistory";

export default function HistoryTransaction() {
  return (
    <div className="flex flex-col gap-y-7 mt-5 px-2">
      <ContainerHistory>
        <TitleHistory month="This Month" balance={-100000} />
        <ContainerContent>
          <ContentHistory
            src="/coffe.png"
            title="Mocca Cappucino"
            date="06 July 2024"
            time="20:38"
            balance={-20000}
          />
          <ContentHistory
            src="/coffe.png"
            title="Mocca Cappucino"
            date="06 July 2024"
            time="20:38"
            balance={-20000}
          />
        </ContainerContent>
      </ContainerHistory>
      <ContainerHistory>
        <TitleHistory month="June" balance={-250000} />
        <ContainerContent>
          <ContentHistory
            src="/coffe.png"
            title="Mocca Cappucino"
            date="06 July 2024"
            time="20:38"
            balance={-20000}
          />
          <ContentHistory
            src="/coffe.png"
            title="Mocca Cappucino"
            date="06 July 2024"
            time="20:38"
            balance={-20000}
          />
        </ContainerContent>
      </ContainerHistory>
    </div>
  );
}
