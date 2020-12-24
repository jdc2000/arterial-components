import {
  TopAppBar,
  TopAppBarFixedAdjust,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarIcon,
} from '..';

const Meta = {
  title: 'TopAppBar',
  decorators: [
    storyFn => {
      // document.body.style.margin = 0;
      return (
        <div style={{height: '100vh', width: '400px', margin: '-8px'}}>
          {storyFn()}
        </div>
      );
    },
  ],
};
export default Meta;

const BASIC = 'Standard',
  DENSE = 'Dense',
  DENSE_PROMINENT = 'Dense Prominent',
  FIXED = 'Fixed',
  PROMINENT = 'Prominent',
  SHORT_COLLAPSED = 'Short Collapsed',
  SHORT = 'Short';

function MyTopAppBar({title}) {
  const dense = title.includes(DENSE),
    fixed = title === FIXED,
    prominent = title.includes(PROMINENT),
    short = title.includes(SHORT),
    shortCollapsed = title === SHORT_COLLAPSED;
  return (
    <>
      <TopAppBar
        dense={dense}
        fixed={fixed}
        prominent={prominent}
        short={short}
        shortCollapsed={shortCollapsed}
        shortHasActionItem={short || shortCollapsed}
      >
        <TopAppBarRow>
          <TopAppBarSection>
            <TopAppBarIcon icon="menu" nav />
            <TopAppBarTitle>{title}</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <TopAppBarIcon icon="file_download" action />
            {!short && !shortCollapsed && (
              <>
                <TopAppBarIcon icon="print" action />
                <TopAppBarIcon icon="bookmark" action />
              </>
            )}
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust
        dense={dense}
        fixed={fixed}
        prominent={prominent}
        short={short}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus
          semper eget duis at tellus at urna. Interdum posuere lorem ipsum
          dolor. Malesuada fames ac turpis egestas integer eget. Semper risus in
          hendrerit gravida. Pretium quam vulputate dignissim suspendisse in est
          ante in nibh. Egestas sed sed risus pretium quam vulputate. Et tortor
          at risus viverra adipiscing at. Leo a diam sollicitudin tempor id eu
          nisl nunc mi. Turpis nunc eget lorem dolor sed viverra ipsum nunc
          aliquet. Et tortor at risus viverra adipiscing. Nunc sed blandit
          libero volutpat sed cras ornare. Leo integer malesuada nunc vel risus
          commodo viverra maecenas. In iaculis nunc sed augue lacus viverra
          vitae congue eu. Est ultricies integer quis auctor elit.
        </p>
        <p>
          Arcu dictum varius duis at. Aliquet porttitor lacus luctus accumsan
          tortor posuere ac. Tortor at auctor urna nunc id cursus metus.
          Pulvinar mattis nunc sed blandit. Non consectetur a erat nam at. Nulla
          facilisi morbi tempus iaculis urna id volutpat lacus. Est lorem ipsum
          dolor sit amet consectetur adipiscing. A condimentum vitae sapien
          pellentesque habitant morbi tristique senectus. Condimentum vitae
          sapien pellentesque habitant. Vitae semper quis lectus nulla at
          volutpat diam ut. Tincidunt ornare massa eget egestas purus viverra
          accumsan in nisl.
        </p>
        <p>
          Auctor eu augue ut lectus arcu bibendum at varius. Facilisis sed odio
          morbi quis. Mattis enim ut tellus elementum. Euismod quis viverra nibh
          cras pulvinar mattis. Mauris sit amet massa vitae tortor condimentum
          lacinia quis. Rhoncus aenean vel elit scelerisque mauris pellentesque
          pulvinar pellentesque habitant. Nulla malesuada pellentesque elit eget
          gravida cum sociis natoque. Potenti nullam ac tortor vitae purus
          faucibus ornare suspendisse. Quisque egestas diam in arcu cursus
          euismod quis viverra. Odio euismod lacinia at quis risus sed
          vulputate. Proin nibh nisl condimentum id venenatis a condimentum
          vitae. Scelerisque viverra mauris in aliquam.
        </p>
        <p>
          Mi sit amet mauris commodo quis imperdiet. Non enim praesent elementum
          facilisis leo. Pellentesque dignissim enim sit amet venenatis. Massa
          eget egestas purus viverra accumsan. Erat imperdiet sed euismod nisi
          porta. Viverra vitae congue eu consequat ac. Vitae nunc sed velit
          dignissim sodales ut eu. Senectus et netus et malesuada fames ac
          turpis egestas. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Nulla facilisi cras fermentum odio. Convallis a cras semper
          auctor neque.
        </p>
        <p>
          Vitae suscipit tellus mauris a diam. Et tortor at risus viverra
          adipiscing at. Venenatis lectus magna fringilla urna porttitor rhoncus
          dolor purus. Eget gravida cum sociis natoque penatibus et magnis dis.
          Lacus sed turpis tincidunt id. Vitae proin sagittis nisl rhoncus
          mattis rhoncus urna neque. Et pharetra pharetra massa massa. Mattis
          ullamcorper velit sed ullamcorper morbi tincidunt. A pellentesque sit
          amet porttitor eget dolor morbi. Vulputate ut pharetra sit amet
          aliquam id. Sit amet tellus cras adipiscing enim eu. Tellus at urna
          condimentum mattis pellentesque id nibh tortor. In fermentum et
          sollicitudin ac orci phasellus. Et tortor at risus viverra adipiscing
          at in tellus. Viverra nam libero justo laoreet sit amet cursus sit.
          Fames ac turpis egestas maecenas pharetra. Quis hendrerit dolor magna
          eget est lorem. Id eu nisl nunc mi ipsum faucibus vitae. Sapien
          pellentesque habitant morbi tristique senectus. Massa enim nec dui
          nunc mattis. Sem viverra aliquet eget sit. Sit amet volutpat consequat
          mauris nunc congue nisi vitae. Vestibulum mattis ullamcorper velit sed
          ullamcorper morbi tincidunt ornare massa. Ut tristique et egestas quis
          ipsum suspendisse ultrices gravida dictum. Magna eget est lorem ipsum
          dolor sit.
        </p>
      </TopAppBarFixedAdjust>
    </>
  );
}

export const Basic = () => <MyTopAppBar title={BASIC} />;
export const Fixed = () => <MyTopAppBar title={FIXED} />;
export const Dense = () => <MyTopAppBar title={DENSE} />;
export const DenseProminent = () => <MyTopAppBar title={DENSE_PROMINENT} />;
export const Prominent = () => <MyTopAppBar title={PROMINENT} />;
export const Short = () => <MyTopAppBar title={SHORT} />;
export const ShortCollapsed = () => <MyTopAppBar title={SHORT_COLLAPSED} />;
