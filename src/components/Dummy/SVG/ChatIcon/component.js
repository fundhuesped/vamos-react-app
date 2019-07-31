import React from "react";
import { Svg, G, Path, Rect, Text, TSpan } from "react-native-svg";

export default class ChatIcon extends React.Component {
  render() {
    return (
      <Svg
        height={this.props.height}
        width={this.props.width}
        viewBox="0 0 250 258"
      >
        <G
          id="chat"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <G id="ile">
            <Path
              d="M215.207626,190.882128 C214.350469,190.883586 213.507614,190.662639 212.761524,190.240905 L181.9647,172.75475 C181.029854,172.219045 179.935164,172.03216 178.875393,172.227344 C171.459346,173.552629 163.940214,174.217301 156.406543,174.213533 C106.135539,174.210327 65.2335063,145.276737 65.2335063,109.714504 C65.2335063,74.1522702 106.135539,45.2218866 156.408147,45.2186805 C206.680755,45.2154744 247.590808,74.1522702 247.590808,109.714504 C247.590808,128.223409 236.234479,145.893915 216.434687,158.194177 C214.721866,159.24884 213.902187,161.300088 214.416853,163.243809 L220.001986,184.686309 C220.388454,186.169393 220.065568,187.747743 219.127664,188.960215 C218.18976,190.172688 216.742685,190.882448 215.20923,190.882128 L215.207626,190.882128 Z M179.69985,162.249913 C182.21011,162.251967 184.67682,162.905429 186.858507,164.14633 L207.461904,175.848652 L204.829738,165.749388 C203.206344,159.609261 205.795111,153.130733 211.204039,149.79736 C228.031616,139.34382 237.682892,124.738361 237.682892,109.720916 C237.682892,79.6154911 201.222339,55.1239745 156.404939,55.1239745 C111.587539,55.1239745 75.1350062,79.6122849 75.1350062,109.714504 C75.1350062,139.816723 111.589143,164.311445 156.408147,164.311445 C163.355592,164.315629 170.289675,163.702991 177.128636,162.480753 C177.978335,162.328627 178.839833,162.251915 179.703058,162.251516 L179.69985,162.249913 Z"
              id="Shape"
              fill={this.props.color ? this.props.color : "#FFFFFF"}
              fill-rule="nonzero"
            />
            <Path
              d="M34.7614423,204.781319 C33.2289966,204.78164 31.7828746,204.071879 30.8455877,202.859407 C29.9083008,201.646934 29.5856269,200.068584 29.9718409,198.585501 L35.5629151,177.144602 C36.0757037,175.195955 35.2528455,173.141269 33.5367919,172.085351 C13.7548407,159.791501 2.40919199,142.1242 2.40919199,123.613691 C2.40919199,88.0498531 43.2843038,59.1178651 93.5254266,59.1178651 C96.04686,59.1178651 98.5378374,59.1932088 101.003168,59.3294687 C103.731746,59.4819379 105.820506,61.8169771 105.669342,64.545819 C105.509048,67.2710173 103.199203,69.3117099 100.453357,69.2123203 C98.1696942,69.0851444 95.860384,69.0199534 93.5254266,69.0167473 C48.7407305,69.0151442 12.3057779,93.5018528 12.3057779,123.613691 C12.3057779,138.626328 21.9474955,153.231788 38.7543797,163.680519 C44.1622102,167.015874 46.7515108,173.49674 45.1308971,179.640563 L42.5004635,189.739828 L63.0870933,178.037505 C66.0408888,176.375675 69.4796004,175.789863 72.8169729,176.379943 C79.6518841,177.602486 86.5820579,178.214062 93.5254266,178.207429 C113.179142,178.207429 132.178856,173.361386 147.026941,164.562201 C148.549196,163.630178 150.455381,163.590243 152.015331,164.457692 C153.575281,165.325142 154.547213,166.965527 154.558827,168.750497 C154.570442,170.535466 153.619939,172.188362 152.07141,173.076041 C135.721366,182.769732 114.926353,188.106312 93.5254266,188.106312 C85.9939185,188.111659 78.4768874,187.446436 71.0633505,186.11852 C70.0035317,185.933868 68.9124646,186.120727 67.9744744,186.647529 L37.2075372,204.133684 C36.4622456,204.558338 35.6192098,204.781542 34.7614423,204.781319 Z"
              id="Shape"
              fill={this.props.color ? this.props.color : "#FFFFFF"}
              fill-rule="nonzero"
            />
            <Rect id="Rectangle-Path" x="0" y="0" width="250" height="250" />
            <Text
              id="…"
              fontFamily="VistaSansAltBold"
              fontSize="100"
              fontWeight="bold"
              letterSpacing="0.400000006"
              fill={this.props.color ? this.props.color : "#FFFFFF"}
            >
              <TSpan x="116.2" y="116">
                …
              </TSpan>
            </Text>
          </G>
        </G>
      </Svg>
    );
  }
}
